import { DateRange, SortType, Topic } from '../Topic'

export interface State {
  dateRange: DateRange
  sortType: SortType
  topics?: Topic[]
  topic?: Topic
}

export interface Methods {
  setConditions(dateRange: DateRange, sortType: SortType): void
  setTopics(topics: Topic[]): void
  setTopic(topic: Topic): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes = 'SET_CONDITIONS' | 'SET_TOPICS' | 'SET_TOPIC'
