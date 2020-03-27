import React from 'react'
import {
  ButtonProps,
  MenuButtonProps as ChakraMenuButtonProps,
  MenuButton as ChakraButton
} from '@chakra-ui/core'

type MenuButtonProps = ChakraMenuButtonProps & ButtonProps

const MenuButton: React.FC<MenuButtonProps> = React.forwardRef(
  (props: MenuButtonProps, ref: React.Ref<any>) => {
    return <ChakraButton ref={ref} {...props} />
  }
)

export default MenuButton
