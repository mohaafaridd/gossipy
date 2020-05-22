import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_TAGS } from '../graphql/queries'
import Loading from './layout/Loading'
import BackgroundMessage from './layout/BackgroundMessage'
import { Tag } from '../interfaces/Tag'
import TagCard from './tags/TagCard'
import CreateTagForm from './tags/CreateTagForm'
import { TagContext, StationContext } from '../context/'

const TagsTab = () => {
  const stationContext = useContext(StationContext)
  const { tags, setTags } = useContext(TagContext)

  const { data, loading, error } = useQuery(GET_TAGS, {
    variables: {
      stationId: stationContext.station?.id
    }
  })

  useEffect(() => {
    if (data?.tags) {
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

      {tags?.length === 0 && (
        <BackgroundMessage type='Check' message={`No tags were found`} />
      )}
      {tags?.map(tag => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </div>
  )
}

export default TagsTab
