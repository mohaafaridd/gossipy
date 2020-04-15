import React from 'react'
import { Button, Input } from '@chakra-ui/core'
const SearchBar = () => {
  return (
    <div className='flex flex-col w-full p-2 md:px-0 md:pb-0 md:flex-row md:w-2/3 xl:w-1/3 mx-auto'>
      <Input placeholder='Search...' />
      <Button variantColor='blue' className='mt-2 md:m-0 md:ml-2'>
        Go
      </Button>
    </div>
  )
}

export default SearchBar
