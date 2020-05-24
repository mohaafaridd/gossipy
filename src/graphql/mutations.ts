import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
  mutation($data: UserCreateInput!) {
    signUp(data: $data) {
      token
      user {
        id
        identifier
        name
        image
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
        image
        karma {
          id
          type
        }
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation($data: UserUpdateInput!, $image: Upload) {
    updateUser(data: $data, image: $image) {
      id
      name
      identifier
      email
      image
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
  mutation($id: Int!, $data: StationUpdateInput!, $image: Upload) {
    updateStation(id: $id, data: $data, image: $image) {
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

export const CREATE_MEMBERSHIP = gql`
  mutation($stationId: Int!) {
    createMembership(stationId: $stationId) {
      id
      state
      role
    }
  }
`

export const UNSUBSCRIBE_MEMBERSHIP = gql`
  mutation($id: Int!) {
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
      user {
        id
      }
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
  mutation($data: TopicCreateInput!, $image: Upload) {
    createTopic(data: $data, image: $image) {
      id
      identifier
      station {
        id
        identifier
      }
    }
  }
`

export const EDIT_TOPIC = gql`
  mutation($id: Int!, $data: TopicUpdateInput, $image: Upload) {
    createTopic(id: $id, data: $data, image: $image) {
      id
      identifier
      station {
        id
        identifier
      }
    }
  }
`

export const DELETE_TOPIC = gql`
  mutation($id: Int!) {
    deleteTopic(id: $id) {
      id
    }
  }
`

export const CREATE_TAG = gql`
  mutation($stationId: Int!, $data: TagCreateInput!) {
    createTag(stationId: $stationId, data: $data) {
      id
      name
      topics {
        id
      }
    }
  }
`

export const UPDATE_TAG = gql`
  mutation($id: Int!, $data: TagUpdateInput!) {
    updateTag(id: $id, data: $data) {
      id
      name
      topics {
        id
      }
    }
  }
`

export const DELETE_TAG = gql`
  mutation($id: Int!) {
    deleteTag(id: $id) {
      id
    }
  }
`
