import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  useToast,
  Switch,
  Flex
} from '@chakra-ui/core'
import validator from 'validator'

type FormData = {
  email: string
  password: string
}

const Signin = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const toast = useToast()

  const validation = {
    email: (value: string) => {
      if (validator.isEmail(value)) return true

      return 'Please enter a valid email'
    }
  }

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password)
    toast({
      title: 'Account Logged in.',
      status: 'success',
      duration: 9000,
      isClosable: true
    })

    toast({
      title: 'Login Failed',
      status: 'error',
      duration: 9000,
      isClosable: true
    })
  })

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            name='email'
            type='string'
            placeholder='donald@ducks.co'
            ref={register({ validate: validation.email })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor='password'>password</FormLabel>
          <Input
            type='password'
            name='password'
            placeholder='••••••••••••••••'
            ref={register()}
          />
        </FormControl>

        <Flex justify='center' align='center'>
          <FormLabel htmlFor='remember-token'>Remember User</FormLabel>
          <Switch id='remember-token' />
        </Flex>

        <Button type='submit' variantColor='green'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Signin
