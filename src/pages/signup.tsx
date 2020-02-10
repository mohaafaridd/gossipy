import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  FormHelperText,
  Box,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useToast
} from '@chakra-ui/core'
import validator from 'validator'
import zxcvbn from 'zxcvbn'

type FormData = {
  name: string
  email: string
  password: string
  confirmation: string
}

const Signup = () => {
  const { register, handleSubmit, watch, errors } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const validation = {
    email: (value: string) => {
      if (validator.isEmail(value)) return true

      return 'Please enter a valid email'
    },

    password: (value: string) => {
      value = value.trim()
      if (value.length < 6)
        return 'Please write a minimum 6 characters length password'
      if (zxcvbn(value).score < 3) return 'Please pick a stronger password'
      return true
    },

    confirmation: (value: string) => {
      if (value === watch('password')) return true
      return 'Please confirm your password by typing it once again'
    }
  }

  const onSubmit = handleSubmit(({ name, email, password, confirmation }) => {
    console.log(name, email, password, confirmation)
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  })

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input name='name' placeholder='Donald Trump' ref={register()} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

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
            ref={register({ validate: validation.password })}
          />
          <Progress
            hasStripe
            value={zxcvbn(watch('password') || '').score * 25}
            color={zxcvbn(watch('password') || '').score < 3 ? 'red' : 'green'}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmation}>
          <FormLabel htmlFor='confirmation'>Confirm Password</FormLabel>
          <Input
            type='password'
            name='confirmation'
            placeholder='••••••••••••••••'
            ref={register({ validate: validation.confirmation })}
          />
          <FormErrorMessage>
            {errors.confirmation && errors.confirmation.message}
          </FormErrorMessage>
        </FormControl>

        <Button type='submit' variantColor='green'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Signup
