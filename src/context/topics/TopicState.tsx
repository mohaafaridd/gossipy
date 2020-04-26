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

    createTopic(topic) {
      dispatch({
        type: 'CREATE_TOPIC',
        payload: {
          topic
        }
      })
    },

    updateTopic(topic) {
      dispatch({
        type: 'UPDATE_TOPIC',
        payload: {
          topic
        }
      })
    },

    deleteTopic(topic) {
      dispatch({
        type: 'DELETE_TOPIC',
        payload: {
          topic
        }
      })
    },

    setTopics(topics) {
      dispatch({
        type: 'SET_TOPICS',
        payload: {
          topics
        }
      })
    },

    setTopic(topic) {
      dispatch({
        type: 'SET_TOPIC',
        payload: {
          topic
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
