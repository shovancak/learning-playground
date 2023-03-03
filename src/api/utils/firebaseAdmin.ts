import * as firebase from 'firebase-admin'

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var firebaseAdmin: firebase.app.App
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const firebaseAdminClient =
  global.firebaseAdmin ||
  firebase.initializeApp({
    credential: firebase.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  })

global.firebaseAdmin = firebaseAdminClient
