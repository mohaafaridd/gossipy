import { State, Action } from '../../interfaces/context/topic'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CONDITIONS': {
      const { dateRange, sortType } = action.payload
      return {
        ...state,
        dateRange,
        sortType
      }
    }

    case 'CREATE_TOPIC': {
      const { topic } = action.payload
      return {
        ...state,
        topic
      }
    }

    case 'UPDATE_TOPIC': {
      const { topic } = action.payload
      return {
        ...state,
        topic
      }
    }

    case 'DELETE_TOPIC': {
      const { topic } = action.payload
      return {
        ...state,
        topics: state.topics?.filter(item => item.id !== topic?.id)
      }
    }

    case 'SET_TOPIC': {
      const { topic } = action.payload
      return {
        ...state,
        topic
      }
    }

    case 'SET_TOPICS': {
      const { topics } = action.payload
      return {
        ...state,
        topics
      }
    }

    default:
      return state
  }
}
