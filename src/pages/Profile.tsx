import React from 'react'
import { useParams } from 'react-router-dom'
import BackgroundMessage from '../components/BackgroundMessage'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import UserInfo from '../components/UserInfo'
import UserActivity from '../components/UserActivity'
import { GET_PROFILE } from '../graphql/queries'

const Profile = () => {
  const { identifier } = useParams()
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { identifier }
  })

  if (loading) return <Loading message='Loading user profile' />
  if (error)
    return <BackgroundMessage message='Fetching Profile Failed' type='Error' />

  const { profile } = data

  return (
    <section id='user-profile'>
      {/* User Info Component */}
      <UserInfo profile={profile} />
      {/* User Public, (Subbed) Topics, Latest Comments & latest votes */}
      <UserActivity profile={profile} />
    </section>
  )
}

export default Profile
