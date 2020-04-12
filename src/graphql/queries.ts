import { gql } from 'apollo-boost'

export const GET_PROFILE = gql`
  query getProfile($identifier: String!) {
    profile(identifier: $identifier) {
      id
      identifier
      name

      karma {
        id
        type
      }

      createdAt
    }
  }
`

export const GET_STATION = gql`
  query getStation($identifier: String!) {
    station(identifier: $identifier) {
      id
      name
      identifier
      description
      public
      members {
        id
        state
      }
      topics {
        id
      }
      createdAt
    }
  }
`

export const GET_MEMBERSHIP = gql`
  query getMembership($station: ID!) {
    userMembership(stationIdentifier: $station) {
      id
      state
      role

      station {
        id
        identifier
        name
        description
        public
      }
    }
  }
`

export const GET_MEMBERSHIPS = gql`
  query getMemberships {
    userMemberships {
      id
      state
      role
      station {
        id
        identifier
        name
        public
      }

      createdAt
    }
  }
`

export const GET_MEMBERSHIPS_STATION = gql`
  query getMemberships(
    $page: Int!
    $station: ID
    $role: Role
    $roles: [Role!]
    $state: MembershipState
  ) {
    memberships(
      page: $page
      station: $station
      role: $role
      roles: $roles
      state: $state
    ) {
      id
      user {
        id
        identifier
        name
      }
      role
      state
    }
  }
`

export const GET_TOPICS = gql`
  query getTopics(
    $sortType: SortType!
    $dateRange: DateRange!
    $user: ID
    $station: ID
    $subscribed: Boolean
  ) {
    topics(
      sortType: $sortType
      dateRange: $dateRange
      user: $user
      station: $station
      subscribed: $subscribed
    ) {
      id
      identifier
      title
      content

      user {
        id
        identifier
        name
      }

      station {
        id
        identifier
        name
      }

      votes {
        id
        type
        user {
          id
        }
      }

      createdAt
    }
  }
`

export const GET_TOPIC = gql`
  query getTopic($topicIdentifier: String!, $stationIdentifier: String!) {
    topic(
      topicIdentifier: $topicIdentifier
      stationIdentifier: $stationIdentifier
    ) {
      id
      identifier
      title
      content

      user {
        id
        identifier
        name
      }

      station {
        id
        identifier
        name
        public
      }

      votes {
        id
        type
        user {
          id
        }
      }

      comments {
        id
        content

        user {
          id
          identifier
          name
        }

        votes {
          id
          type
        }

        createdAt
      }

      createdAt
    }
  }
`
