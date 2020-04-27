import React, { FC, useReducer } from 'react'
import { State, Methods } from '../../interfaces/context/comment'
import reducer from './commentReducer'
import { CommentProvider } from './commentContext'
const CommentState: FC = ({ children }) => {
  const initialState: State = {
    comment: undefined,
    comments: []
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    createComment(comment) {
      dispatch({
        type: 'CREATE_COMMENT',
        payload: {
          comment
        }
      })
    },

    updateComment(comment) {
      dispatch({
        type: 'UPDATE_COMMENT',
        payload: {
          comment
        }
      })
    },

    deleteComment(comment) {
      dispatch({
        type: 'DELETE_COMMENT',
        payload: {
          comment
        }
      })
    },

    setComment(comment) {
      dispatch({
        type: 'SET_COMMENT',
        payload: {
          comment
        }
      })
    },

    setComments(comments) {
      dispatch({
        type: 'SET_COMMENTS',
        payload: {
          comments
        }
      })
    }
  }

  return (
    <CommentProvider
      value={{
        ...state,
        ...methods
      }}>
      {children}
    </CommentProvider>
  )
}

export default CommentState
