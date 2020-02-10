import React, { FC } from 'react'
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core'

const Chakra: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ThemeProvider>
  )
}

export default Chakra
