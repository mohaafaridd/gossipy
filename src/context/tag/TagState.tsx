import React, { FC, useReducer } from 'react'
import { State, Methods } from '../../interfaces/context/tag'
import reducer from './tagReducer'
import { TagProvider } from './tagContext'
const TagState: FC = ({ children }) => {
  const initialState: State = {
    tag: undefined,
    tags: []
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    createTag(tag) {
      dispatch({
        type: 'CREATE_TAG',
        payload: {
          tag
        }
      })
    },

    updateTag(tag) {
      dispatch({
        type: 'UPDATE_TAG',
        payload: {
          tag
        }
      })
    },

    deleteTag(tag) {
      dispatch({
        type: 'DELETE_TAG',
        payload: {
          tag
        }
      })
    },

    setTag(tag) {
      dispatch({
        type: 'SET_TAG',
        payload: {
          tag
        }
      })
    },

    setTags(tags) {
      dispatch({
        type: 'SET_TAGS',
        payload: {
          tags
        }
      })
    }
  }

  return (
    <TagProvider
      value={{
        ...state,
        ...methods
      }}>
      {children}
    </TagProvider>
  )
}

export default TagState
