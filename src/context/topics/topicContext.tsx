import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/topic'

const TopicContext = createContext<State & Methods>({
  dateRange: 'TODAY',
  sortType: 'HOT',
  setConditions: () => undefined,
  setTopic: () => undefined,
  setTopics: () => undefined,
  addComment: () => undefined
})

export const { Provider: TopicProvider, Consumer } = TopicContext
export default TopicContext
