import React, { useEffect, useState } from 'react'
import { SEARCH } from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
import { useQueryParam } from 'use-query-params'
import Loading from '../components/Loading'
import BackgroundMessage from '../components/BackgroundMessage'
import { Search } from '../interfaces/Search'
import { User } from '../interfaces/User'
import { Station } from '../interfaces/Station'
import { Topic } from '../interfaces/Topic'

const SearchPage = () => {
  const [query, setQuery] = useQueryParam<string>('query')
  const [page, setPage] = useQueryParam<number>('page')

  const [users, setUsers] = useState<User[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [topics, setTopics] = useState<Topic[]>([])

  // if (!query) setQuery('Are you lost')
  // if (!page) setPage(1)

  const { data, loading, error } = useQuery(SEARCH, {
    variables: {
      query: query || '',
      page: page ? +page : 1
    }
  })

  useEffect(() => {
    if (data?.search) {
      const { search }: { search: Search } = data
      setUsers(search.users)
      setStations(search.stations)
      setTopics(search.topics)
    }
  }, [data])

  if (loading) return <Loading />
  if (error) return <BackgroundMessage type='Error' message='Search failed' />

  return (
    <div>
      {users.map(user => user.name)}
      {stations.map(station => station.name)}
      {topics.map(topic => topic.title)}
    </div>
  )
}

export default SearchPage
