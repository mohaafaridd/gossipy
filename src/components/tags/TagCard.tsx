import React, { useContext } from 'react'
import { useToast, useColorMode, IconButton } from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Tag } from '../../interfaces/Tag'
import { TagContext } from '../../context/index'
import { DELETE_TAG } from '../../graphql/mutations'
import useGradient from '../../hooks/useGradient'

const TagCard = ({ tag }: { tag: Tag }) => {
  const { setTag, deleteTag: deleteTagContext } = useContext(TagContext)
  const [deleteTag, { loading: tagDeleteLoading }] = useMutation(DELETE_TAG)
  const toast = useToast()
  const [[bg]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

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
    <div className={`tag-card ${bg} ${borderClass}`}>
      <div className='details'>
        <p className='name'>{tag.name}</p>
        <p className='topics'>{tag.topics.length} associated topics</p>
      </div>
      <IconButton
        className='edit-btn'
        aria-label='edit-btn'
        icon='edit'
        variantColor='green'
        onClick={() => setTag(tag)}
      />
      <IconButton
        isLoading={tagDeleteLoading}
        onClick={() => onDelete()}
        className='delete-btn'
        aria-label='delete-btn'
        icon='delete'
        variantColor='red'
        variant='outline'
      />
    </div>
  )
}

export default TagCard
