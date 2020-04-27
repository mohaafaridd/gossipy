import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/topic'

const TopicContext = createContext<State & Methods>({
  dateRange: 'TODAY',
  sortType: 'HOT',
  setConditions: (dateRange, sortType) => undefined,
  createTopic: topic => undefined,
  updateTopic: topic => undefined,
  deleteTopic: topic => undefined,
  setTopics: topics => undefined,
  setTopic: topic => undefined
})

export const { Provider: TopicProvider, Consumer } = TopicContext
export default TopicContext
