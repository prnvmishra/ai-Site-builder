import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import { stripeWebhook } from './controllers/stripeWebhook.js';

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
}

app.use(cors(corsOptions))
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook)

app.all('/api/auth/*', toNodeHandler(auth));

app.use(express.json({limit: '50mb'}))

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

// Debug endpoint to test database connection
app.get('/api/debug', async (req: Request, res: Response) => {
    try {
        const prisma = await import('./lib/prisma.js').then(m => m.default);
        await prisma.$connect();
        const userCount = await prisma.user.count();
        res.json({ 
            message: 'Database connected successfully',
            userCount,
            env: {
                DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
                BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? 'SET' : 'NOT_SET',
                BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'NOT_SET',
                TRUSTED_ORIGINS: process.env.TRUSTED_ORIGINS || 'NOT_SET'
            }
        });
    } catch (error) {
        console.error('Debug endpoint error:', error);
        res.status(500).json({ 
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
