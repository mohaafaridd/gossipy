import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
  mutation($data: UserCreateInput!) {
    signUp(data: $data) {
      token
      user {
        id
        identifier
        name
        karma {
          id
          type
        }
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation($data: UserLoginInput!) {
    signIn(data: $data) {
      token
      user {
        id
        name
        identifier
        karma {
          id
          type
        }
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation($data: UserUpdateInput!) {
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
  mutation($data: StationCreateInput!) {
    createStation(data: $data) {
      id
      identifier
      name
      createdAt
    }
  }
`

export const UPDATE_STATION = gql`
  mutation($id: Int!, $data: StationUpdateInput!) {
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
  mutation($id: Int!, $data: MembershipUpdateInput) {
    updateMembership(id: $id, data: $data) {
      id
      state
      role
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation($data: CommentCreateInput!) {
    createComment(data: $data) {
      id
      content

      user {
        id
        identifier
        name
      }

      createdAt
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation($id: Int!, $data: CommentUpdateInput!) {
    updateComment(id: $id, data: $data) {
      id
      content

      user {
        id
        identifier
        name
      }

      createdAt
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

export const UPSERT_VOTE = gql`
  mutation($data: VoteUpsertInput!) {
    upsertVote(data: $data) {
      id
      type
    }
  }
`

export const DELETE_VOTE = gql`
  mutation($id: Int!) {
    deleteVote(id: $id) {
      id
      type
    }
  }
`

export const CREATE_TOPIC = gql`
  mutation($data: TopicCreateInput!) {
    createTopic(data: $data) {
      id
      identifier
      station {
        id
        identifier
      }
    }
  }
`
