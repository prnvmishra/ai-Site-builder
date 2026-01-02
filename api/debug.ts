import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Debug endpoint called:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body
    })
    
    res.status(200).json({ 
      message: 'Debug endpoint working',
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Debug handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
