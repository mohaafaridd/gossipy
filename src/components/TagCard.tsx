import React, { useContext } from 'react'
import { Button, useToast } from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Tag } from '../interfaces/Tag'
import { TagContext } from '../context/'
import { DELETE_TAG } from '../graphql/mutations'

const TagCard = ({ tag }: { tag: Tag }) => {
  const { setTag, deleteTag: deleteTagContext } = useContext(TagContext)
  const [deleteTag, { loading: tagDeleteLoading }] = useMutation(DELETE_TAG)
  const toast = useToast()

  const onDelete = async () => {
    try {
      const { data } = await deleteTag({
        variables: {
          id: tag.id
        }
      })

      deleteTagContext(data.deleteTag)

      toast({
        title: 'Tag Deleted',
        duration: 2000,
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Operation Failed',
        duration: 2000,
        status: 'error'
      })
    }
  }

  return (
    <div className='bg-gray-700 shadow p-2 rounded w-full md:w-2/3 xl:w-1/3 mx-auto grid gap-2 grid-cols-2'>
      <p className='font-semibold col-start-1'>{tag.name}</p>
      <p className='col-start-2'>{tag.topics.length} associated topics</p>
      <Button
        className='col-start-1'
        leftIcon='edit'
        onClick={() => setTag(tag)}>
        Edit
      </Button>
      <Button
        isLoading={tagDeleteLoading}
        onClick={() => onDelete()}
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
