import express, { Request, Response } from 'express';
import cors from 'cors';

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

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
