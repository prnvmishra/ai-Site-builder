import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { slug } = req.query
    console.log('Better Auth endpoint called:', slug, req.method)
    
    // Handle various Better Auth endpoints
    switch (slug) {
      case 'sign-in':
      case 'sign-up':
        // These are handled by specific files
        res.status(404).json({ message: 'Not found' })
        break
        
      default:
        // Return a generic response for other endpoints
        res.status(200).json({ 
          message: `Better Auth endpoint: ${slug}`,
          method: req.method
        })
    }
  } catch (error) {
    console.error('Better Auth handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
