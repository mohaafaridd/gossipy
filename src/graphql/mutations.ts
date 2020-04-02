import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
  mutation($data: CreateUserInput!) {
    signUp(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation($data: LoginUserInput!) {
    signIn(data: $data) {
      token
      user {
        id
        name
        identifier
        email
        karma {
          id
          type
        }
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      identifier
      email
      karma {
        id
        type
      }
    }
  }
`

export const CREATE_STATION = gql`
  mutation($data: CreateStationInput!) {
    createStation(data: $data) {
      id
      identifier
      name
      createdAt
    }
  }
`

export const UPDATE_STATION = gql`
  mutation($id: ID!, $data: UpdateStationInput!) {
    updateStation(id: $id, data: $data) {
      id
      identifier
      name
      description
      public
      createdAt
    }
  }
`

export const CREATE_MEMBERSHIP = gql`
  mutation($stationId: ID!) {
    createMembership(stationId: $stationId) {
      id
      state
      role
    }
  }
`

export const UNSUBSCRIBE_MEMBERSHIP = gql`
  mutation($id: ID!) {
    unsubscribeMembership(id: $id) {
      id
      state
      role

      station {
        id
        name
        public
      }
    }
  }
`
export const UPDATE_MEMBERSHIP = gql`
  mutation($id: ID!, $data: MembershipUpdateInput) {
    updateMembership(id: $id, data: $data) {
      id
      state
      role

      station {
        id
        name
        public
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation($data: CreateCommentInput!) {
    createComment(data: $data) {
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
  }
`
