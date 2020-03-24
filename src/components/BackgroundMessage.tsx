import React from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { AiOutlineWarning } from 'react-icons/ai'
import { Box } from '@chakra-ui/core'
import useGradient from '../hooks/useGradient'

type MessageType = 'Error' | 'Warning'

const BackgroundMessage = ({
  message,
  type
}: {
  message: string
  type: MessageType
}) => {
  const [, [textGradiant]] = useGradient()

  return (
    <div className='h-full flex flex-col m-auto'>
      <div className='m-auto'>
        <Box
          size={32}
          as={type === 'Error' ? MdErrorOutline : AiOutlineWarning}
          className={`mx-auto ${textGradiant}`}
        />
        <p className={textGradiant}>{message}</p>
      </div>
    </div>
  )
}

export default BackgroundMessage
