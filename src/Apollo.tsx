import React, { FC, useContext, useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
// import ApolloClient from 'apollo-boost'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

import AuthContext from './context/auth/authContext'
import Loading from './components/Loading'

const Apollo: FC = ({ children }) => {
  const authContext = useContext(AuthContext)
  const { token } = authContext
  const [loading, setLoading] = useState(false)

  const [client, setClient] = useState(
    new ApolloClient({
      cache: new InMemoryCache(),
      link: createUploadLink({
        uri: process.env.REACT_APP_API_URL,
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    })
  )

  useEffect(() => {
    setLoading(true)
    setClient(
      new ApolloClient({
        cache: new InMemoryCache(),
        link: createUploadLink({
          uri: process.env.REACT_APP_API_URL,
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        })
      })
    )

    setLoading(false)
  }, [token])

  if (loading) return <Loading message='Processing' />

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Apollo
