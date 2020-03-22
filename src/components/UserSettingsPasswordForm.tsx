import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useForm } from 'react-hook-form'
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputLeftElement,
  IconButton,
  Progress
} from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import zxcvbn from 'zxcvbn'
import useGradiant from '../hooks/useGradiant'

const UPDATE_PASSWORD = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      identifier
      email
      karma {
        id
        type
      }
    }
  }
`

type FormData = {
  password: string
  confirmation: string
}

const UserSettingsPasswordForm = () => {
  const [[bg]] = useGradiant()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const toast = useToast()
  const { register, handleSubmit, watch, errors } = useForm<FormData>()

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD)

  const validation = {
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

  const onSubmit = handleSubmit(async ({ password }) => {
    const variables = {
      data: {
        password
      }
    }

    try {
      const { data } = await updatePassword({ variables })
      console.log('data', data)
      toast({
        title: 'Password was update.',
        description: 'Your password was updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Updating password failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <div id='update-password' className={`update-form ${bg}`}>
      <h3>Update Password</h3>

      <form onSubmit={onSubmit} autoComplete='off'>
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
        <Button
          className='btn'
          tabIndex={5}
          isLoading={loading}
          type='submit'
          variantColor='green'>
          Update
        </Button>
      </form>
    </div>
  )
}

export default UserSettingsPasswordForm
