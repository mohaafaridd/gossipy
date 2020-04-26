import React from 'react'
import { Button } from '@chakra-ui/core'
import { Tag } from '../interfaces/Tag'

const TagCard = ({ tag }: { tag: Tag }) => {
  return (
    <div className='bg-gray-700 shadow p-2 rounded w-full md:w-2/3 xl:w-1/3 mx-auto grid gap-2 grid-cols-2'>
      <p className='font-semibold col-start-1'>{tag.name}</p>
      <p className='col-start-2'>{tag.topics.length} associated topics</p>
      <Button className='col-start-1' leftIcon='edit'>
        Edit
      </Button>
      <Button
        className='col-start-2'
        leftIcon='delete'
        variantColor='red'
        variant='outline'>
        Delete
      </Button>
    </div>
  )
}

export default TagCard
