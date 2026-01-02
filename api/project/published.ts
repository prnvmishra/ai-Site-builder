import { VercelRequest, VercelResponse } from '@vercel/node'
import { getPublishedProjects } from '../../server/controllers/projectController.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await getPublishedProjects(req as any, res as any)
  } catch (error) {
    console.error('Published projects handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
