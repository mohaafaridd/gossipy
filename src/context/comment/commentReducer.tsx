import { State, Action } from '../../interfaces/context/comment'
export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_COMMENT': {
      const { comment } = action.payload
      return comment
        ? {
            ...state,
            comment: undefined,
            comments: state.comments?.concat(comment)
          }
        : state
    }

    case 'UPDATE_COMMENT': {
      const { comment } = action.payload
      return comment
        ? {
            ...state,
            comment: undefined,
            comments: state.comments?.map(item =>
              item.id === comment?.id ? comment : item
            )
          }
        : state
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
