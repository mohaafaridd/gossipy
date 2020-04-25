import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import StationContext from '../context/station/stationContext'
import { GET_TAGS } from '../graphql/queries'
import Loading from './Loading'
import BackgroundMessage from './BackgroundMessage'
import { Tag } from '../interfaces/Tag'
import TagCard from './TagCard'
import { Input, Button } from '@chakra-ui/core'

const TagsTab = () => {
  const stationContext = useContext(StationContext)
  const [tags, setTags] = useState<Tag[]>([])
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
    console.log('error', error)
    return <BackgroundMessage message='Error fetching tags' type='Error' />
  }

  return (
    <div className='grid gap-2 p-2'>
      <form className='grid gap-2 grid-cols-12 w-full md:w-2/3 xl:w-1/3 mx-auto'>
        <Input className='col-start-1 col-span-10' placeholder='Tag name...' />
        <Button
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
        <TagCard tag={tag} />
      ))}
    </div>
  )
}

export default TagsTab
