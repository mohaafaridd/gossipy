import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
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
import useGradient from '../hooks/useGradient'
import { Station } from '../interfaces/Station'
import { CREATE_STATION } from '../graphql/mutations'

type FormData = {
  name: string
  public: boolean
  description: string
}

const CreateStation = () => {
  const { authenticated } = useContext(AuthContext)
  const [station, setStation] = useState<Station | undefined>(undefined)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [createStation, { loading }] = useMutation(CREATE_STATION)
  const toast = useToast()
  const [[bg]] = useGradient()

  if (!authenticated) return <Redirect to='/explore' />
  if (station) return <Redirect to={`/s/${station.identifier}`} />

  const validation = {
    name: (value: string) => {
      if (validator.isLength(value, { min: 2, max: 16 })) return true
      else if (value.toLowerCase() === 'create')
        return "You can't name a station using this name"
      else if (value.length < 2)
        return 'Name length must be over 1 character. e.g., EY, YO, EYO'
      return 'Name has length limit of 16 characters.'
    },

    description: (value: string) => {
      if (validator.isLength(value, { max: 200 })) return true
      return 'Description has exceeded maximum length of 200 characters.'
    }
  }

  const onSubmit = handleSubmit(
    async ({ name, description, public: publicStation }) => {
      const variables = {
        data: {
          name,
          description,
          public: publicStation
        }
      }

      try {
        const {
          data: { createStation: station }
        } = await createStation({ variables })

        toast({
          title: `Successfully created ${station.name} station.`,
          status: 'success',
          duration: 2000,
          isClosable: true
        })

        setStation(station)
      } catch (error) {
        toast({
          title: 'Creating station failed',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  return (
    <div id='create-station' className={bg}>
      <h2 id='heading'>Create Station</h2>
      <form onSubmit={onSubmit} autoComplete='off'>
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
          <Switch name='public' id='public-trigger' ref={register} />
        </FormControl>

        <Button
          tabIndex={3}
          isLoading={loading}
          type='submit'
          variantColor='green'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreateStation
