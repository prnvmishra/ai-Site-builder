import { toNodeHandler } from 'better-auth/node'
import { auth } from '../../../server/lib/auth.js'

export default toNodeHandler(auth)
export const config = {
  runtime: 'nodejs',
}
