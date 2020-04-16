import React, { useRef } from 'react'
import { Button, Input } from '@chakra-ui/core'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
const SearchBar = () => {
  const history = useHistory()

  const [value, setValue] = React.useState('')
  const handleChange = (event: any) => setValue(event.target.value)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('value', value)
    // return <Redirect to={`/search?query=${value}`} />
    history.push(`/search?query=${value}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col w-full p-2 md:px-0 md:pb-0 md:flex-row md:w-2/3 xl:w-1/3 mx-auto'>
      <Input value={value} onChange={handleChange} placeholder='Search...' />
      <Button variantColor='blue' className='mt-2 md:m-0 md:ml-2'>
        Go
      </Button>
    </form>
  )
}

export default SearchBar
