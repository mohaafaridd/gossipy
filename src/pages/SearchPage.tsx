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
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import TopicCard from '../components/TopicCard'
import UserCard from '../components/UserCard'
import StationCard from '../components/StationCard'

const SearchPage = () => {
  const [query, setQuery] = useQueryParam<string>('query')
  const [page, setPage] = useQueryParam<number>('page')

  const [users, setUsers] = useState<User[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [topics, setTopics] = useState<Topic[]>([])

  if (!query) setQuery('ahly')
  if (!page) setPage(1)

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
    <div id='search'>
      <Tabs
        className='tabs'
        align='center'
        variant='soft-rounded'
        variantColor='blue'>
        <TabList className='tab-list'>
          <Tab className='tab'>Users</Tab>
          <Tab className='tab'>Stations</Tab>
          <Tab className='tab'>Topics</Tab>
        </TabList>
        <TabPanels className='tab-panels'>
          <TabPanel className='tab-panel'>
            {users.length === 0 && (
              <BackgroundMessage type='Warning' message='No users were found' />
            )}
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </TabPanel>
          <TabPanel className='tab-panel'>
            {stations.length === 0 && (
              <BackgroundMessage
                type='Warning'
                message='No stations were found'
              />
            )}
            {stations.map(station => (
              <StationCard key={station.id} station={station} />
            ))}
          </TabPanel>
          <TabPanel className='tab-panel'>
            {topics.length === 0 && (
              <BackgroundMessage
                type='Warning'
                message='No topics were found'
              />
            )}
            {topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default SearchPage
