import React, { FC } from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { FaThumbsUp } from 'react-icons/fa'
import './App.css'

const App: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <h1>
        First commit yay <FaThumbsUp />
      </h1>
      {children}
    </ThemeProvider>
  )
}

export default App
