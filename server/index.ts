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
