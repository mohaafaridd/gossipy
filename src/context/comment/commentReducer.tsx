import { State, Action } from '../../interfaces/context/comment'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_COMMENT': {
      const { comment } = action.payload
      return {
        ...state,
        comment
      }
    }

    case 'UPDATE_COMMENT': {
      const { comment } = action.payload
      return {
        ...state,
        comment
      }
    }

    case 'DELETE_COMMENT': {
      const { comment } = action.payload
      return {
        ...state,
        comments: state.comments?.filter(item => item.id !== comment?.id)
      }
    }

    case 'SET_COMMENT': {
      const { comment } = action.payload
      return {
        ...state,
        comment
      }
    }

    case 'SET_COMMENTS': {
      const { comments } = action.payload
      return {
        ...state,
        comments
      }
    }
    default:
      return state
  }
}
