import React, { useContext } from 'react'
import TopicsOption from '../components/TopicsOption'
import Topics from '../components/Topics'
import AuthContext from '../context/auth/authContext'
import { Redirect } from 'react-router-dom'

const Home = () => {
  const { authenticated } = useContext(AuthContext)

  if (!authenticated) return <Redirect to='/explore' />

  return (
    <div id='explore'>
      <TopicsOption />
      <Topics subscribed={true} />
    </div>
  )
}

export default Home
