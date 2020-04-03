import React, { useEffect } from 'react'
import { useParams, useRouteMatch, Route, useHistory } from 'react-router-dom'
import BackgroundMessage from '../components/BackgroundMessage'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import UserInfo from '../components/UserInfo'
import UserActivity from '../components/UserActivity'
import { GET_PROFILE } from '../graphql/queries'
import UserTopics from '../components/UserTopics'

const Profile = () => {
  const history = useHistory()
  const { identifier } = useParams()
  const match = useRouteMatch()
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { identifier }
  })

  useEffect(() => {
    if (data) {
      history.push(`${match.url}/activities`)
    }
  }, [data])

  if (loading) return <Loading message='Loading user profile' />
  if (error)
    return <BackgroundMessage message='Fetching Profile Failed' type='Error' />

  const { profile } = data

  return (
    <section id='user-profile'>
      {/* User Info Component */}
      <UserInfo profile={profile} />
      {/* User Public, (Subbed) Topics, Latest Comments & latest votes */}
      <Route path={`${match.url}/activities`}>
        <UserActivity profile={profile} />
      </Route>

      <Route path={`${match.url}/topics`}>
        <UserTopics profile={profile} />
      </Route>
    </section>
  )
}

export default Profile
