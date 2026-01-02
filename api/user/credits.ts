import { VercelRequest, VercelResponse } from '@vercel/node'
import { getUserCredits } from '../../server/controllers/userController.js'
import { protect } from '../../server/middlewares/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await protect(req as any, res as any, async () => {
      await getUserCredits(req as any, res as any)
    })
  } catch (error) {
    console.error('Credits handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
