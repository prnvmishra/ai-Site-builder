import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const slug = req.query.slug as string[]
    const endpoint = slug ? slug.join('/') : 'root'
    console.log('Better Auth endpoint called:', endpoint, req.method, req.body)
    
    // Handle various Better Auth endpoints
    if (endpoint.includes('sign-up') || endpoint.includes('signup')) {
      return res.status(201).json({ 
        message: 'Sign up successful',
        user: { email: 'test@example.com', name: 'User' }
      })
    }
    
    if (endpoint.includes('sign-in') || endpoint.includes('signin')) {
      return res.status(200).json({ 
        message: 'Sign in successful',
        user: { email: 'test@example.com', name: 'User' }
      })
    }
    
    // Default response for other endpoints
    res.status(200).json({ 
      message: `Better Auth endpoint: ${endpoint}`,
      method: req.method,
      received: true
    })
  } catch (error) {
    console.error('Better Auth handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
