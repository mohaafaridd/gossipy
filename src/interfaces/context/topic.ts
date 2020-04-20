import { DateRange, SortType, Topic } from '../Topic'
import { Comment } from '../Comment'
import { Vote } from '../Vote'

export interface State {
  dateRange: DateRange
  sortType: SortType
  topics?: Topic[]
  topic?: Topic
  comments?: Comment[]
  comment?: Comment
}

export interface Methods {
  setConditions(dateRange: DateRange, sortType: SortType): void
  setTopics(topics: Topic[]): void
  setTopic(topic: Topic): void

  addComment(comment: Comment): void
  updateComment(comment: Comment): void
  deleteComment(comment: Comment): void
  setComment(comment?: Comment): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes =
  | 'SET_CONDITIONS'
  | 'SET_TOPICS'
  | 'SET_TOPIC'
  | 'ADD_COMMENT'
  | 'DELETE_COMMENT'
  | 'SET_COMMENT'
  | 'EDIT_COMMENT'
