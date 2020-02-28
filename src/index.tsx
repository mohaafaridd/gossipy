import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { CookiesProvider } from 'react-cookie'
import AuthState from './context/auth/AuthState'

import Chakra from './chakra'
import App from './App'
import './styles/tailwind.css'
import { CSSReset } from '@chakra-ui/core'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
})

ReactDOM.render(
  <CookiesProvider>
    <AuthState>
      <ApolloProvider client={client}>
        <Chakra>
          <CSSReset />
          <App />
        </Chakra>
      </ApolloProvider>
    </AuthState>
  </CookiesProvider>,
  document.getElementById('root')
)
