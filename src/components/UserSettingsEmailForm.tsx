import React from 'react'
import { useForm } from 'react-hook-form'
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import validator from 'validator'
import useGradient from '../hooks/useGradient'
import { UPDATE_USER } from '../graphql/mutations'

type FormData = {
  email: string
}

const UserSettingsEmailForm = () => {
  const [[bg]] = useGradient()
  const toast = useToast()
  const { register, handleSubmit, errors, setError } = useForm<FormData>()

  const [updateEmail, { loading }] = useMutation(UPDATE_USER)

  const validation = {
    email: (value: string) => {
      if (validator.isEmail(value)) return true

      return 'Please enter a valid email'
    }
  }

  const onSubmit = handleSubmit(async ({ email }) => {
    const variables = {
      data: {
        email
      }
    }

    try {
      const { data } = await updateEmail({ variables })

      console.log('data', data)
      toast({
        title: 'Email was update.',
        description: 'Your email was updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      const unique = {
        trigger: error.message.includes('unique'),
        field: 'email'
      }

      if (unique.trigger)
        setError(
          unique.field,
          'unique',
          `${unique.field.charAt(0).toUpperCase() +
            unique.field.slice(1)} already exists`
        )
      else
        toast({
          title: 'Updating email failed',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
    }
  })

  return (
    <div id='update-email' className={`update-form ${bg}`}>
      <h3>Update Email</h3>

      <form onSubmit={onSubmit} autoComplete='off'>
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

export default UserSettingsEmailForm
