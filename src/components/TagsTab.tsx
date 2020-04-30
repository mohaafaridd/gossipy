import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import StationContext from '../context/station/stationContext'
import { GET_TAGS } from '../graphql/queries'
import Loading from './Loading'
import BackgroundMessage from './BackgroundMessage'
import { Tag } from '../interfaces/Tag'
import TagCard from './TagCard'
import CreateTagForm from './CreateTagForm'

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
    return <BackgroundMessage message='Error fetching tags' type='Error' />
  }

  return (
    <div className='grid gap-2 p-2'>
      <CreateTagForm />

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
