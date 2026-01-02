import { VercelRequest, VercelResponse } from '@vercel/node'
import { toNodeHandler } from 'better-auth/node'
import { auth } from '../../server/lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const handler = toNodeHandler(auth)
    return handler(req, res)
  } catch (error) {
    console.error('Auth handler error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const config = {
  runtime: 'nodejs',
}
