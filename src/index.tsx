import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import Context from './Context'

import Apollo from './Apollo'
import Chakra from './chakra'
import App from './App'
import './styles/tailwind.css'
import { CSSReset } from '@chakra-ui/core'

ReactDOM.render(
  <CookiesProvider>
    <Context>
      <Apollo>
        <Chakra>
          <CSSReset />
          <App />
        </Chakra>
      </Apollo>
    </Context>
  </CookiesProvider>,
  document.getElementById('root')
)
