import React, { FC } from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  theme,
  CSSReset
} from '@chakra-ui/core'

const Chakra: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <ColorModeProvider>{children}</ColorModeProvider>
    </ThemeProvider>
  )
}

export default Chakra
