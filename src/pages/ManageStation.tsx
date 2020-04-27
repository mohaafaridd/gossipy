import React, { useContext, useEffect, useState } from 'react'
import {
  useParams,
  Redirect,
  Route,
  useRouteMatch,
  useHistory,
  useLocation
} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import Loading from '../components/Loading'
import MembersTabs from '../components/MembersTabs'
import UpdateStationTab from '../components/UpdateStationTab'
import TagsTab from '../components/TagsTab'
import { StationContext, AuthContext, MembershipContext } from '../context/'
import { GET_MEMBERSHIP } from '../graphql/queries'
import { Membership } from '../interfaces/Membership'

const ManageStation = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  const { authenticated } = useContext(AuthContext)
  const { setMembership } = useContext(MembershipContext)
  const { station, setStation } = useContext(StationContext)
  const { identifier } = useParams()
  const [loading, setLoading] = useState(true)
  const [isManager, setIsManager] = useState(false)
  const { data } = useQuery(GET_MEMBERSHIP, {
    variables: { stationIdentifier: identifier }
  })

  useEffect(() => {
    if (data) {
      const { membership }: { membership: Membership } = data
      if (membership !== null) {
        setMembership(membership)
        setStation(membership.station)
        setIsManager(
          membership.role === 'FOUNDER' ||
            membership.role === 'ADMIN' ||
            membership.role === 'MODERATOR'
        )
      }
      setLoading(false)

      if (
        !location.pathname.includes('info') &&
        !location.pathname.includes('members') &&
        !location.pathname.includes('tags')
      )
        history.push(`${match.url}/info`)
    }
    // eslint-disable-next-line
  }, [data])

  if (!authenticated) return <Redirect to={`/s/${identifier}`} />

  if (loading) return <Loading message='Loading Station Info' />

  if (station?.identifier !== identifier || !isManager)
    return <Redirect to={`/s/${identifier}`} />

  const { membership }: { membership: Membership } = data

  return (
    <div id='manage-station'>
      <Tabs
        className='tabs'
        variant='line'
        defaultIndex={
          location.pathname.includes('info')
            ? 0
            : location.pathname.includes('members')
            ? 1
            : location.pathname.includes('tags')
            ? 2
            : 0
        }
        onChange={index => {
          switch (index) {
            case 0:
              history.push(`${match.url}/info`)
              break

            case 1:
              history.push(`${match.url}/members`)
              break

            case 2:
              history.push(`${match.url}/tags`)
              break

            default:
              history.push(`${match.url}/info`)
              break
          }
        }}>
        <TabList>
          <Tab>Info</Tab>
          <Tab>Members</Tab>
          <Tab>Tags</Tab>
        </TabList>
        <TabPanels className='tab-panels'>
          <TabPanel className='tab-panel'>
            <Route path={`${match.url}/info`}>
              <UpdateStationTab membership={membership} />
            </Route>
          </TabPanel>
          <TabPanel className='tab-panel'>
            <Route path={`${match.url}/members`} component={MembersTabs} />
          </TabPanel>
          <TabPanel className='tab-panel'>
            <Route path={`${match.url}/tags`} component={TagsTab} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default ManageStation
