import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      // For now, return no session (not authenticated)
      res.status(200).json({ 
        session: null,
        user: null
      })
    } else {
      res.setHeader('Allow', 'GET')
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Session handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
