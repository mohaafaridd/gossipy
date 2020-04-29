import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import TopicsOption from '../components/TopicsOption'
import Topics from '../components/Topics'
import AuthContext from '../context/auth/authContext'

const Home = () => {
  const { authenticated } = useContext(AuthContext)

  if (!authenticated) return <Redirect to='/explore' />

  return (
    <div id='explore'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <TopicsOption />
      <Topics explore={false} />
    </div>
  )
}

export default Home
