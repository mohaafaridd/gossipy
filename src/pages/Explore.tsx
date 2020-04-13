import React from 'react'
import Topics from '../components/Topics'
import TopicsOption from '../components/TopicsOption'

const Explore = () => {
  return (
    <div id='explore'>
      <TopicsOption />
      <Topics explore={true} />
    </div>
  )
}

export default Explore
