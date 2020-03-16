import React from 'react'
import { useParams } from 'react-router-dom'
import BackgroundMessage from '../components/BackgroundMessage'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import { gql } from 'apollo-boost'
import UserInfo from '../components/UserInfo'

const GET_PROFILE = gql`
  query getProfile($identifier: ID!) {
    profile(identifier: $identifier) {
      id
      identifier
      name

      karma {
        id
        type
      }

      topics {
        id
        title
        station {
          id
          name
          public
        }

        createdAt
      }

      comments {
        id
        topic {
          id
          title
        }
        createdAt
      }

      memberships {
        id
        station {
          id
          name
          identifier
        }
      }

      createdAt
    }
  }
`

const Profile = () => {
  const { identifier } = useParams()
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { identifier }
  })

  console.log('identifier', identifier)

  if (loading) return <Loading message='Loading user profile' />
  if (error)
    return <BackgroundMessage message='Fetching Profile Failed' type='Error' />

  const { profile } = data

  return (
    <section id='user-profile' className='flex-grow py-2'>
      {/* User Info Component */}
      <UserInfo profile={profile} />
      {/* User Public, (Subbed) Topics, Latest Comments & latest votes */}
    </section>
  )
}

export default Profile
