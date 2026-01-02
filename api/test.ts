import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({ 
      message: 'API is working!',
      method: req.method,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
