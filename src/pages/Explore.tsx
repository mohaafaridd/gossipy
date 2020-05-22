import React from 'react'
import { Helmet } from 'react-helmet'
import Topics from '../components/topics/Topics'
import TopicsOption from '../components/topics/TopicsOption'

const Explore = () => {
  return (
    <div id='explore'>
      <Helmet>
        <title>Explore</title>
      </Helmet>
      <TopicsOption />
      <Topics explore={true} />
    </div>
  )
}

export default Explore
