import React from 'react'
import { Topic as ITopic } from '../interfaces/Topic'
import { Box } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const Topic = ({ topic }: { topic: ITopic }) => {
  return (
    <Box className='border shadow hover:shadow-xl cursor-default transition duration-500 ease-in-out p-2 m-2 rounded-md'>
      <Link to={`/s/${topic.station.id}`}>
        <p className='font-light'>s/{topic.station.identifier}</p>
      </Link>

      <p className='text-lg font-bold'>{topic.title}</p>

      <p>{topic.content}</p>
    </Box>
  )
}

export default Topic
