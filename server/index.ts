import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || ['*'],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}))

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.get('/api/test-env', (req: Request, res: Response) => {
    res.json({
        message: 'Environment variables test',
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasAuthSecret: !!process.env.BETTER_AUTH_SECRET,
        hasAuthUrl: !!process.env.BETTER_AUTH_URL,
        hasTrustedOrigins: !!process.env.TRUSTED_ORIGINS,
        nodeEnv: process.env.NODE_ENV
    });
});

// Simple authentication endpoints
app.post('/api/auth/sign-up', async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Import Prisma dynamically
        const { default: prisma } = await import('./lib/prisma.js');
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Create new user and account
        const user = await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                email,
                name,
            }
        });

        // Create account with password
        await prisma.account.create({
            data: {
                id: crypto.randomUUID(),
                accountId: user.id,
                providerId: 'credential',
                userId: user.id,
                password: password // In production, use proper password hashing
            }
        });

        res.status(201).json({ 
            message: 'User created successfully',
            user: { email: user.email, name: user.name, id: user.id }
        });
    } catch (error) {
        console.error('Sign-up error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.post('/api/auth/sign-in', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }

        // Import Prisma dynamically
        const { default: prisma } = await import('./lib/prisma.js');
        
        // Find user by email with their account
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                accounts: true
            }
        });
        
        if (!user || user.accounts.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password (using first account for credential auth)
        const account = user.accounts.find(acc => acc.providerId === 'credential');
        if (!account || account.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Sign in successful',
            user: { email: user.email, name: user.name, id: user.id }
        });
    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({ error: 'Failed to sign in' });
    }
});

app.get('/api/auth/session', async (req: Request, res: Response) => {
    try {
        // For now, return null session (we'll add proper sessions later)
        res.json({ session: null, user: null });
    } catch (error) {
        res.json({ session: null, user: null });
    }
});

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
