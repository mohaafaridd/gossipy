import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import AuthState from './context/auth/AuthState'
import StationState from './context/station/StationState'
import TopicState from './context/topics/TopicState'

import Apollo from './Apollo'
import Chakra from './chakra'
import App from './App'
import './styles/tailwind.css'
import { CSSReset } from '@chakra-ui/core'

ReactDOM.render(
  <CookiesProvider>
    <AuthState>
      <StationState>
        <TopicState>
          <Apollo>
            <Chakra>
              <CSSReset />
              <App />
            </Chakra>
          </Apollo>
        </TopicState>
      </StationState>
    </AuthState>
  </CookiesProvider>,
  document.getElementById('root')
)
