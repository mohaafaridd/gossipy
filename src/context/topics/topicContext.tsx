import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/topic'

const TopicContext = createContext<State & Methods>({
  dateRange: 'TODAY',
  sortType: 'HOT',
  setTopic: () => undefined,
  setTopics: () => undefined
})

export const { Provider: TopicProvider, Consumer } = TopicContext
export default TopicContext
