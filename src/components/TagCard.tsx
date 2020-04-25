import React from 'react'
import { Tag } from '../interfaces/Tag'
import { Button } from '@chakra-ui/core'

const TagCard = ({ tag }: { tag: Tag }) => {
  return (
    <div>
      <p>{tag.name}</p>
      <p>{tag.topics.length} associated topics</p>
      <Button leftIcon='edit'>Edit</Button>
      <Button leftIcon='delete'>Delete</Button>
    </div>
  )
}

export default TagCard
