import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import ApolloProvider from 'providers/ApolloProvider'
import UserAuthProvider from 'providers/UserProvider'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider>
    <UserAuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserAuthProvider>
  </ApolloProvider>
)

export default MyApp
