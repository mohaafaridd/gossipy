import React, { FC, useContext } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import AuthContext from './context/auth/authContext'

const Apollo: FC = ({ children }) => {
  const authContext = useContext(AuthContext)
  const { token } = authContext
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Apollo
