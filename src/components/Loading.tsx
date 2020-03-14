import React, { FC } from 'react'
import { Spinner, ISpinnerProps } from '@chakra-ui/core'

const Loading = ({
  message,
  props
}: {
  message: string
  props?: Partial<ISpinnerProps>
}) => {
  return (
    <div className='h-screen flex'>
      <div className='m-auto text-center'>
        <Spinner size={props?.size || 'md'} />
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Loading
