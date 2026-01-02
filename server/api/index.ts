import { VercelRequest, VercelResponse } from '@vercel/node'
import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

// CORS configuration
app.use(cors({
  origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
  credentials: true,
}))

app.use(express.json({limit: '50mb'}))

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is Live!' })
})

// Auth endpoints (simplified for testing)
app.post('/api/auth/sign-up', (req: Request, res: Response) => {
  res.json({ message: 'Sign up endpoint working' })
})

app.post('/api/auth/sign-in', (req: Request, res: Response) => {
  res.json({ message: 'Sign in endpoint working' })
})

export default app
