import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' })
      }
      
      res.status(200).json({ 
        message: 'Sign in successful',
        user: { email, name: 'User' }
      })
    } else {
      res.setHeader('Allow', 'POST')
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Sign-in email handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
