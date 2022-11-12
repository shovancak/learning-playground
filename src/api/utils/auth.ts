import * as firebase from 'firebase-admin'
import { NextApiRequest } from 'next'

export const checkUserTokenFromRequest = (request: NextApiRequest) => {
  const {
    headers: { authorization },
  } = request
  if (authorization) {
    const [scheme, idToken] = authorization.split(' ')
    if (scheme === 'Bearer' && idToken) {
      return firebase.auth().verifyIdToken(idToken)
    }
  }
  return null
}
