import { gql } from 'apollo-boost'

export const GET_PROFILE = gql`
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
          identifier
          public
        }

        createdAt
      }

      comments {
        id
        content
        topic {
          id
          title
        }

        station {
          id
          name
          identifier
          public
        }

        createdAt
      }

      votes {
        id
        type
        topic {
          id
          title
        }

        station {
          id
          name
          identifier
          public
        }
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

export const GET_STATION = gql`
  query getStation($identifier: ID!) {
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
  query getMemberships($station: ID, $role: Role, $state: MembershipState) {
    memberships(station: $station, role: $role, state: $state) {
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
