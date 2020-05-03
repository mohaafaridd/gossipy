import { gql } from 'apollo-boost'

export const GET_PROFILE = gql`
  query getProfile($identifier: String!) {
    profile(identifier: $identifier) {
      id
      identifier
      name
      image

      karma {
        id
        type
      }

      topics {
        id
        identifier
        title
        content

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

      comments {
        id
        content

        topic {
          id
          identifier
          title
        }

        station {
          id
          identifier
          name
        }

        createdAt
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
      image
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
  query membership($stationId: Int, $stationIdentifier: String) {
    membership(stationId: $stationId, stationIdentifier: $stationIdentifier) {
      id
      state
      role
      station {
        id
        identifier
        image
        name
        description
        public
      }
    }
  }
`

export const GET_MEMBERSHIPS = gql`
  query memberships(
    $user: Int
    $station: Int
    $page: Int
    $roles: [Role!]
    $states: [State!]
  ) {
    memberships(
      user: $user
      station: $station
      page: $page
      roles: $roles
      states: $states
    ) {
      count
      data {
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
  }
`

export const GET_MEMBERSHIPS_STATION = gql`
  query memberships(
    $user: Int
    $station: Int
    $page: Int
    $roles: [Role!]
    $states: [State!]
  ) {
    memberships(
      user: $user
      station: $station
      page: $page
      roles: $roles
      states: $states
    ) {
      count
      data {
        id
        state
        role
        user {
          id
          identifier
          name
        }

        createdAt
      }
    }
  }
`

export const GET_TOPICS = gql`
  query getTopics(
    $sortType: SortType!
    $dateRange: DateRange!
    $explore: Boolean
    $user: Int
    $station: Int
    $page: Int
  ) {
    topics(
      sortType: $sortType
      dateRange: $dateRange
      explore: $explore
      user: $user
      station: $station
      page: $page
    ) {
      count
      data {
        id
        identifier
        title
        content
        image

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
  }
`

export const GET_TOPIC = gql`
  query getTopic($identifier: String!, $stationIdentifier: String!) {
    topic(identifier: $identifier, stationIdentifier: $stationIdentifier) {
      id
      identifier
      title
      content
      image

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

        createdAt
      }

      createdAt
    }
  }
`

export const SEARCH = gql`
  query search($query: String!, $page: Int) {
    search(query: $query, page: $page) {
      users {
        id
        name
        identifier
        karma {
          id
          type
        }
        createdAt
      }

      stations {
        id
        name
        image
        identifier
        description
        public
        members {
          id
        }
        createdAt
      }

      topics {
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

          createdAt
        }

        createdAt
      }
    }
  }
`

export const GET_TAGS = gql`
  query tags($stationId: Int!) {
    tags(stationId: $stationId) {
      id
      name
      topics {
        id
      }
    }
  }
`
