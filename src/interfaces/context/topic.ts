import { DateRange, SortType, Topic } from '../Topic'

export interface State {
  dateRange?: DateRange
  sortType?: SortType
  topics?: Topic[]
  topic?: Topic
}

export interface Methods {
  setConditions(dateRange: DateRange, sortType: SortType): void
  createTopic(topic: Topic): void
  updateTopic(topic: Topic): void
  deleteTopic(topic: Topic): void
  setTopics(topics: Topic[]): void
  setTopic(topic?: Topic): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes =
  | 'SET_CONDITIONS'
  | 'CREATE_TOPIC'
  | 'UPDATE_TOPIC'
  | 'DELETE_TOPIC'
  | 'SET_TOPICS'
  | 'SET_TOPIC'
