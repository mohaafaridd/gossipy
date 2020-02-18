import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Switch,
  Flex,
  Grid,
  Heading,
  Link,
  Box,
  InputGroup,
  InputLeftElement,
  IconButton
} from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import validator from 'validator'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { FaUser } from 'react-icons/fa'

import AuthContext from '../context/auth/authContext'

type FormData = {
  email: string
  password: string
}

const SIGN_IN = gql`
  mutation($data: LoginUserInput!) {
    signIn(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const Signin = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()
  const [signIn, { loading: signInLoading }] = useMutation(SIGN_IN)
  const authContext = useContext(AuthContext)

  const validation = {
    email: (value: string) => {
      if (validator.isEmail(value)) return true

      return 'Please enter a valid email'
    },
    password: (value: string) => {
      if (value.length > 0) return true
      return 'Please provide your password'
    }
  }

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const variables = {
      data: {
        email,
        password
      }
    }

    try {
      const {
        data: {
          signIn: { token, user }
        }
      } = await signIn({ variables })

      authContext.signUser(user, token)

      toast({
        title: 'Successfully logged in.',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      authContext.removeUser()

      toast({
        title: 'Login failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <Grid minHeight='100vh'>
      <Heading m='auto'>SIGN IN!</Heading>
      <form onSubmit={onSubmit} autoComplete='off'>
        <Grid rowGap={6} m='auto' width={['100%', '80%', '50%', '20%']}>
          <Box m='auto' as={FaUser} size={100} />
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              tabIndex={1}
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
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  icon={showPassword ? 'view' : 'view-off'}
                  variant='ghost'
                  aria-label='Show password'
                  rounded='none'
                  roundedLeft='md'
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputLeftElement>
              <Input
                tabIndex={2}
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder={
                  showPassword ? 'bChL2G7pgGaqrCES' : '••••••••••••••••'
                }
                ref={register({ validate: validation.password })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Flex justify='center' align='center'>
            <FormLabel htmlFor='remember-token'>Remember User</FormLabel>
            <Switch id='remember-token' />
          </Flex>

          <RouterLink to='/sign-up'>
            <Link>Don't have an account?</Link>
          </RouterLink>

          <Button
            tabIndex={3}
            isLoading={signInLoading}
            type='submit'
            variantColor='green'>
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default Signin
