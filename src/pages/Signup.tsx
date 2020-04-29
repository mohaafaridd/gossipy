import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet'
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
  Box,
  FormHelperText,
  useColorMode
} from '@chakra-ui/core'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { FaUser } from 'react-icons/fa'
import validator from 'validator'
import zxcvbn from 'zxcvbn'

import AuthContext from '../context/auth/authContext'
import useGradient from '../hooks/useGradient'
import { SIGN_UP } from '../graphql/mutations'
import LinkButton from '../components/LinkButton'

type FormData = {
  name: string
  email: string
  password: string
  confirmation: string
}

const Signup = () => {
  const { register, handleSubmit, watch, errors, setError } = useForm<
    FormData
  >()
  const authContext = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [signUp, { loading }] = useMutation(SIGN_UP)
  const toast = useToast()
  const [[bg]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  if (authContext.authenticated) {
    return <Redirect to='/' />
  }

  const validation = {
    name: (value: string) => {
      if (value.length > 0) return true
      if (value.length > 16) return 'Name has maximum length of 16'
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

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    const variables = {
      data: {
        name,
        email,
        password
      }
    }

    try {
      const {
        data: {
          signUp: { token, user }
        }
      } = await signUp({ variables })

      authContext.signUser(user, token)

      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      authContext.removeUser()
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
  })

  return (
    <div id='sign-up' className={`${bg} ${borderClass}`}>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h2 id='heading'>Sign Up</h2>
      <form onSubmit={onSubmit} autoComplete='off'>
        <Box className='form-control' id='icon' as={FaUser} size={100} />

        <FormControl className='form-control' isInvalid={!!errors.name}>
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

        <FormControl className='form-control' isInvalid={!!errors.email}>
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

        <FormControl className='form-control' isInvalid={!!errors.password}>
          <FormLabel htmlFor='password'>Password</FormLabel>
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
            color={zxcvbn(watch('password') || '').score < 3 ? 'red' : 'green'}
            roundedBottom='md'
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl className='form-control' isInvalid={!!errors.confirmation}>
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

        <LinkButton to='/sign-in' className='form-control' variant='link'>
          Already a member?
        </LinkButton>

        <Button
          className='btn'
          tabIndex={5}
          isLoading={loading}
          type='submit'
          variantColor='green'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Signup
