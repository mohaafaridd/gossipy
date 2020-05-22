import React from 'react'
import { ButtonProps, Button as ChakraButton } from '@chakra-ui/core'
import { LinkProps, Link as ReactRouterLink } from 'react-router-dom'
type LinkButtonProps = ButtonProps & LinkProps

const LinkButton: React.FC<LinkButtonProps> = React.forwardRef(
  (props: LinkButtonProps, ref: React.Ref<any>) => {
    return <ChakraButton ref={ref} as={ReactRouterLink} {...props} />
  }
)

export default LinkButton
