import { State, Action } from '../../interfaces/context/tag'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_TAG': {
      const { tag } = action.payload

      return tag
        ? {
            ...state,
            tag,
            tags: state.tags?.concat(tag)
          }
        : state
    }

    case 'UPDATE_TAG': {
      const { tag } = action.payload

      return tag
        ? {
            ...state,
            tag: undefined,
            tags: state.tags?.concat(tag)
          }
        : state
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
