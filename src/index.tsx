import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import Context from './Context'
import { CSSReset } from '@chakra-ui/core'

import Apollo from './Apollo'
import Chakra from './chakra'
import App from './App'
import './styles/tailwind.css'

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
