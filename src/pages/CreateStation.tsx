import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import {
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  Switch
} from '@chakra-ui/core'
import validator from 'validator'
import { TiGroup } from 'react-icons/ti'
import AuthContext from '../context/auth/authContext'
import useGradiant from '../hooks/useGradiant'

type FormData = {
  name: string
  public: boolean
  description: string
}

const CreateStation = () => {
  const { authenticated } = useContext(AuthContext)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const toast = useToast()
  const [[bg]] = useGradiant()

  if (!authenticated) return <Redirect to='/explore' />

  const validation = {
    name: (value: string) => {
      if (validator.isLength(value, { min: 2, max: 16 })) return true
      if (value.length < 2)
        return 'Name length must be over 1 character. e.g., EY, YO, EYO'
      return 'Name has length limit of 16 chaaracters.'
    },

    description: (value: string) => {
      if (validator.isLength(value, { max: 200 })) return true
      return 'Description has exceeded maximum length of 200 characters.'
    }
  }

  return (
    <div id='create-station' className={bg}>
      <h2 id='heading'>Create Station</h2>
      <form autoComplete='off'>
        <Box as={TiGroup} className='form-control' id='icon' size={100} />

        <FormControl className='form-control' isInvalid={!!errors.name}>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            tabIndex={1}
            name='name'
            type='string'
            placeholder='Reich'
            ref={register({ validate: validation.name })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl className='form-control' isInvalid={!!errors.description}>
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Textarea
            resize='none'
            tabIndex={2}
            name='description'
            type='string'
            placeholder=''
            ref={register({ validate: validation.description })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl className='form-control'>
          <FormLabel htmlFor='public-trigger'>Create public station?</FormLabel>
          <Switch id='public-trigger' />
        </FormControl>

        <Button
          tabIndex={3}
          isLoading={false}
          type='submit'
          variantColor='green'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreateStation
