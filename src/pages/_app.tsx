import type { AppProps } from 'next/app'
import ApolloProvider from 'providers/Apollo'
import UserAuthProvider from 'providers/User'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider>
    <UserAuthProvider>
      <Component {...pageProps} />
    </UserAuthProvider>
  </ApolloProvider>
)

export default MyApp
