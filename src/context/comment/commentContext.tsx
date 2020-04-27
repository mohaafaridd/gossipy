import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/comment'

const CommentContext = createContext<State & Methods>({
  createComment: () => undefined,
  updateComment: () => undefined,
  deleteComment: () => undefined,
  setComments: () => undefined,
  setComment: () => undefined
})

export const { Provider: CommentProvider, Consumer } = CommentContext
export default CommentContext
