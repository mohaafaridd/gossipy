import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useRouteMatch, Route, useHistory } from 'react-router-dom'
import BackgroundMessage from '../components/layout/BackgroundMessage'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/layout/Loading'
import UserInfo from '../components/users/UserInfo'
import UserActivity from '../components/users/UserActivity'
import { GET_PROFILE } from '../graphql/queries'
import UserTopics from '../components/users/UserTopics'
import UserSettings from '../components/users/UserSettings'
import { User } from '../interfaces'

const Profile = () => {
  const history = useHistory()
  const { identifier } = useParams()
  const match = useRouteMatch()
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { identifier }
  })

  useEffect(() => {
    if (data && history.location.pathname === match.url) {
      history.push(`${match.url}/activities`)
    }
    //  eslint-disable-next-line
  }, [data])

  if (loading) return <Loading message='Loading user profile' />
  if (error)
    return <BackgroundMessage message='Fetching Profile Failed' type='Error' />

  const { profile }: { profile: User } = data

  return (
    <section id='user-profile'>
      <Helmet>
        <title>{`${profile.name.split(' ')[0]}'s Profile`}</title>
      </Helmet>
      {/* User Info Component */}
      <UserInfo profile={profile} />
      {/* User Public, (Subbed) Topics, Latest Comments & latest votes */}
      <Route path={`${match.url}/activities`}>
        <UserActivity profile={profile} />
      </Route>

      <Route path={`${match.url}/topics`}>
        <UserTopics profile={profile} />
      </Route>

      <Route path={`${match.url}/settings`}>
        <UserSettings profile={profile} />
      </Route>
    </section>
  )
}

export default Profile
