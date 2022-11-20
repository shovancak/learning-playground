import apolloServer, { start as apolloServerStart } from 'api'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc()

const apolloHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await apolloServerStart()
  handler.use(
    apolloServer.createHandler({
      path: '/api/graphql',
    })
  )
  return handler(req, res)
}

export default apolloHandler

// eslint-disable-next-line @typescript-eslint/naming-convention
export const config = {
  api: {
    bodyParser: false,
  },
}
