import React, { FC, useReducer } from 'react'
import { TopicProvider } from './topicContext'
import { State, Methods } from '../../interfaces/context/topic'
import reducer from './topicReducer'

const TopicState: FC = ({ children }) => {
  const initialState: State = {
    dateRange: 'TODAY',
    sortType: 'HOT'
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    setConditions: (dateRange, sortType) => {
      dispatch({
        type: 'SET_CONDITIONS',
        payload: {
          dateRange,
          sortType
        }
      })
    },

    setTopic: topic => {
      dispatch({
        type: 'SET_TOPIC',
        payload: {
          dateRange: state.dateRange,
          sortType: state.sortType,
          topic,
          topics: []
        }
      })
    },

    setTopics: topics => {
      dispatch({
        type: 'SET_TOPIC',
        payload: {
          dateRange: state.dateRange,
          sortType: state.sortType,
          topics,
          topic: undefined
        }
      })
    }
  }

  return (
    <TopicProvider
      value={{
        ...state,
        ...methods
      }}>
      {children}
    </TopicProvider>
  )
}

export default TopicState
