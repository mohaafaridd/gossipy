import React, { useContext } from 'react'
import Topics from '../components/Topics'
import TopicsOption from '../components/TopicsOption'
import TopicContext from '../context/topics/topicContext'

const Explore = () => {
  const { dateRange, sortType } = useContext(TopicContext)

  return (
    <div id='explore'>
      <TopicsOption />
      <Topics sort={sortType} dateRange={dateRange} />
    </div>
  )
}

export default Explore
