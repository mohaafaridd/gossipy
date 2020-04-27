import { State, Action } from '../../interfaces/context/tag'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_TAG': {
      const { tag } = action.payload
      return {
        ...state,
        tag
      }
    }

    case 'UPDATE_TAG': {
      const { tag } = action.payload
      return {
        ...state,
        tag
      }
    }

    case 'DELETE_TAG': {
      const { tag } = action.payload
      return {
        ...state,
        tags: state.tags?.filter(item => item.id !== tag?.id)
      }
    }

    case 'SET_TAG': {
      const { tag } = action.payload
      return {
        ...state,
        tag
      }
    }

    case 'SET_TAGS': {
      const { tags } = action.payload
      return {
        ...state,
        tags
      }
    }
    default:
      return state
  }
}
