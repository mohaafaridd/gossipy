import { Comment } from '../Comment'

export interface State {
  comments: Comment[]
  comment: Comment
}

export interface Methods {
  createComment(comment: Comment): void
  updateComment(comment: Comment): void
  deleteComment(comment: Comment): void
  setComment(comment: Comment): void
  clearComment(): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes =
  | 'CREATE_COMMENT'
  | 'UPDATE_COMMENT'
  | 'DELETE_COMMENT'
  | 'SET_COMMENT'
  | 'CLEAR_COMMENT'
