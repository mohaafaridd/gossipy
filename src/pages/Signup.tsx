import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Progress,
  useToast,
  InputGroup,
  IconButton,
  InputLeftElement,
  Grid,
  Heading,
  Link,
  Box,
  FormHelperText
} from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { FaUser } from 'react-icons/fa'

import validator from 'validator'
import zxcvbn from 'zxcvbn'

type FormData = {
  name: string
  email: string
  password: string
  confirmation: string
}

const SIGN_UP = gql`
  mutation($data: CreateUserInput!) {
    signUp(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const Signup = () => {
  const { register, handleSubmit, watch, errors, setError } = useForm<
    FormData
  >()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const toast = useToast()
  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP)

  const validation = {
    name: (value: string) => {
      if (value.length > 0) return true
      return 'Please provide a name'
    },

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
      if (value.length < 6)
        return 'Please write a minimum 6 characters length password'
      if (value === watch('password')) return true
      return "Passwords don't match"
    }
  }

  const onSubmit = handleSubmit(
    async ({ name, email, password, confirmation }) => {
      const variables = {
        data: {
          name,
          email,
          password
        }
      }

      try {
        await signUp({ variables })
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      } catch (error) {
        const unique = {
          trigger: error.message.includes('unique'),
          field(): string {
            return error.message.includes('identifier') ? 'name' : 'email'
          }
        }

        if (unique.trigger) {
          setError(
            unique.field(),
            'unique',
            `${unique
              .field()
              .charAt(0)
              .toUpperCase() + unique.field().slice(1)} already exists`
          )
        } else {
          toast({
            title: 'Failed Creating Account',
            description: 'Please try again later',
            status: 'error',
            duration: 2000,
            isClosable: true
          })
        }
      }
    }
  )

  return (
    <Grid minHeight='100vh'>
      <Heading m='auto'>SIGN UP!</Heading>
      <form onSubmit={onSubmit} autoComplete='off'>
        <Grid rowGap={4} m='auto' width={['100%', '80%', '50%', '20%']}>
          <Box m='auto' as={FaUser} size={100} />
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              tabIndex={1}
              name='name'
              placeholder='Donald Trump'
              ref={register({ validate: validation.name })}
              aria-describedby='name-helper-text'
            />
            <FormHelperText id='name-helper-text'>
              Names must be unique
            </FormHelperText>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              tabIndex={2}
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
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  icon={showPassword ? 'view' : 'view-off'}
                  variant='ghost'
                  aria-label='Show Password'
                  rounded='none'
                  roundedTopLeft='md'
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputLeftElement>
              <Input
                tabIndex={3}
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder={
                  showPassword ? 'bChL2G7pgGaqrCES' : '••••••••••••••••'
                }
                ref={register({ validate: validation.password })}
                roundedBottom={0}
              />
            </InputGroup>
            <Progress
              hasStripe
              value={zxcvbn(watch('password') || '').score * 25}
              color={
                zxcvbn(watch('password') || '').score < 3 ? 'red' : 'green'
              }
              roundedBottom='md'
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmation}>
            <FormLabel htmlFor='confirmation'>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  icon={showConfirmation ? 'view' : 'view-off'}
                  variant='ghost'
                  aria-label='Show Confirmation'
                  rounded='none'
                  roundedLeft='md'
                  onClick={() => setShowConfirmation(!showConfirmation)}
                />
              </InputLeftElement>
              <Input
                tabIndex={4}
                type={showConfirmation ? 'text' : 'password'}
                name='confirmation'
                placeholder={
                  showConfirmation ? 'bChL2G7pgGaqrCES' : '••••••••••••••••'
                }
                ref={register({ validate: validation.confirmation })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmation && errors.confirmation.message}
            </FormErrorMessage>
          </FormControl>

          <RouterLink to='/sign-in'>
            <Link>Already a member?</Link>
          </RouterLink>

          <Button
            tabIndex={5}
            isLoading={signUpLoading}
            type='submit'
            variantColor='green'>
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default Signup
