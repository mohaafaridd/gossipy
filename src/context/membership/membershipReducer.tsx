import { State, Action } from '../../interfaces/context/membership'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_MEMBERSHIP': {
      const { membership } = action.payload
      return {
        ...state,
        membership
      }
    }

    case 'UPDATE_MEMBERSHIP': {
      const { membership } = action.payload
      return {
        ...state,
        membership
      }
    }

    case 'DELETE_MEMBERSHIP': {
      const { membership } = action.payload
      return {
        ...state,
        memberships: state.memberships?.filter(
          item => item.id !== membership?.id
        )
      }
    }

    case 'SET_MEMBERSHIP': {
      const { membership } = action.payload
      return {
        ...state,
        membership
      }
    }

    case 'SET_MEMBERSHIPS': {
      const { memberships } = action.payload
      return {
        ...state,
        memberships
      }
    }
    default:
      return state
  }
}
