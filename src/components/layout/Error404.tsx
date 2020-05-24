import React from 'react'
import LinkButton from '../common/LinkButton'

const Error404 = () => {
  return (
    <div className='flex flex-col h-screen items-center justify-center '>
      <img
        src='https://blogs.scarsdaleschools.org/dbarro24/files/2017/02/curiousemoji-1xnas6z.png'
        className='h-64'
      />
      <p>You Lost?</p>

      <LinkButton variant='link' to='/'>
        Go back home
      </LinkButton>
    </div>
  )
}

export default Error404
