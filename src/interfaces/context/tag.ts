import { Tag } from '../Tag'

export interface State {
  tags: Tag[]
  tag: Tag
}

export interface Methods {
  createTag(tag: Tag): void
  updateTag(tag: Tag): void
  deleteTag(tag: Tag): void
  setTag(tag: Tag): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes = 'CREATE_TAG' | 'UPDATE_TAG' | 'DELETE_TAG' | 'SET_TAG'
