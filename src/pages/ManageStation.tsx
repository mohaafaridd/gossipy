import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authContext'
import {
  useParams,
  Redirect,
  Route,
  useRouteMatch,
  useHistory,
  useLocation
} from 'react-router-dom'
import StationContext from '../context/station/stationContext'
import { GET_MEMBERSHIP } from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import { Membership } from '../interfaces/Membership'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import MembersTabs from '../components/MembersTabs'
import UpdateStationTab from '../components/UpdateStationTab'

const ManageStation = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  const { authenticated } = useContext(AuthContext)
  const stationContext = useContext(StationContext)
  const { identifier } = useParams()
  const [loading, setLoading] = useState(true)
  const [isManager, setIsManager] = useState(false)

  const { loading: fetchLoading, data } = useQuery(GET_MEMBERSHIP, {
    variables: { station: identifier }
  })

  useEffect(() => {
    if (data) {
      const { userMembership }: { userMembership: Membership } = data
      if (userMembership !== null) {
        stationContext.setMembership(userMembership)
        stationContext.setStation(userMembership.station)
        setIsManager(
          userMembership.role === 'FOUNDER' ||
            userMembership.role === 'ADMIN' ||
            userMembership.role === 'MODERATOR'
        )
      }
      setLoading(false)

      if (
        !location.pathname.includes('info') &&
        !location.pathname.includes('members')
      )
        history.push(`${match.url}/info`)
    }
    // eslint-disable-next-line
  }, [data])

  if (!authenticated) return <Redirect to={`/s/${identifier}`} />

  if (loading || fetchLoading) return <Loading message='Loading Station Info' />

  if (stationContext.station?.identifier !== identifier || !isManager)
    return <Redirect to={`/s/${identifier}`} />

  return (
    <div id='manage-station'>
      <Tabs
        variant='enclosed'
        defaultIndex={
          location.pathname.includes('info')
            ? 0
            : location.pathname.includes('members')
            ? 1
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

            default:
              history.push(`${match.url}/info`)
              break
          }
        }}>
        <TabList>
          <Tab>Info</Tab>
          <Tab>Members</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Route path={`${match.url}/info`} component={UpdateStationTab} />
          </TabPanel>
          <TabPanel>
            <Route path={`${match.url}/members`} component={MembersTabs} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default ManageStation
