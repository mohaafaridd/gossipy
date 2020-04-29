import React from 'react'
import { Helmet } from 'react-helmet'
import { MdErrorOutline } from 'react-icons/md'
import { AiOutlineWarning } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
import { Box } from '@chakra-ui/core'
import useGradient from '../hooks/useGradient'

type MessageType = 'Error' | 'Warning' | 'Check'

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
      <Helmet>
        <title>{message || 'Error | Gossipy'}</title>
      </Helmet>
      <div className='m-auto'>
        <Box
          size={32}
          as={
            type === 'Error'
              ? MdErrorOutline
              : type === 'Warning'
              ? AiOutlineWarning
              : FaCheck
          }
          className={`mx-auto ${textGradiant}`}
        />
        <p className={textGradiant}>{message}</p>
      </div>
    </div>
  )
}

export default BackgroundMessage
