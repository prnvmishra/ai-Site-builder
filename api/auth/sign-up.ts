import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      const { email, password, name } = req.body
      
      // Basic validation
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing required fields' })
      }
      
      // TODO: Implement actual user creation with database
      res.status(201).json({ 
        message: 'User created successfully',
        user: { email, name }
      })
    } else {
      res.setHeader('Allow', 'POST')
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Sign-up handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
