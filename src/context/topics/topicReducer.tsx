import { State, Action } from '../../interfaces/context/topic'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CONDITIONS':
    case 'SET_TOPICS':
    case 'SET_TOPIC':
      return {
        ...state,
        ...action.payload
      }

    case 'ADD_COMMENT': {
      const { topic } = state
      if (action.payload?.comment)
        topic?.comments?.push(action.payload?.comment)
      return {
        ...state,
        topic
      }
    }

    case 'DELETE_COMMENT': {
      const { topic } = state
      if (topic)
        topic.comments = topic?.comments?.filter(comment => {
          return comment.id !== action.payload?.comment?.id
        })

      return {
        ...state,
        topic
      }
    }

    default:
      return state
  }
}
