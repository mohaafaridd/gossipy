import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import StationContext from '../context/station/stationContext'
import { GET_TAGS } from '../graphql/queries'
import Loading from './Loading'
import BackgroundMessage from './BackgroundMessage'
import { Tag } from '../interfaces/Tag'
import TagCard from './TagCard'
import { Input, Button } from '@chakra-ui/core'
import { CREATE_TAG } from '../graphql/mutations'

const TagsTab = () => {
  const stationContext = useContext(StationContext)
  const [tags, setTags] = useState<Tag[]>([])
  const [tagName, setTagName] = useState('')
  const [createTag, { loading: tagCreationLoading }] = useMutation(CREATE_TAG)
  const { data, loading, error } = useQuery(GET_TAGS, {
    variables: {
      stationId: stationContext.station?.id
    }
  })

  useEffect(() => {
    if (data?.tags) {
      console.log('data', data)
      setTags(data.tags)
    }
  }, [data])

  if (loading) return <Loading message={`Loading tags`} />
  if (error) {
    return <BackgroundMessage message='Error fetching tags' type='Error' />
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const { data } = await createTag({
      variables: {
        stationId: stationContext.station?.id,
        data: {
          name: tagName
        }
      }
    })

    setTags(tags.concat(data.createTag))
  }

  return (
    <div className='grid gap-2 p-2'>
      <form
        onSubmit={onSubmit}
        className='grid gap-2 grid-cols-12 w-full md:w-2/3 xl:w-1/3 mx-auto'>
        <Input
          value={tagName}
          onChange={(e: any) => setTagName(e.target.value)}
          className='col-start-1 col-span-10'
          placeholder='Tag name...'
        />
        <Button
          onClick={onSubmit}
          isLoading={tagCreationLoading}
          className='col-start-11 col-span-2'
          variantColor='green'
          leftIcon='add'>
          Create
        </Button>
      </form>

      {tags.length === 0 && (
        <BackgroundMessage type='Check' message={`No tags were found`} />
      )}
      {tags.map(tag => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </div>
  )
}

export default TagsTab
