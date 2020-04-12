import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import validator from 'validator'
// Contexts
import AuthContext from '../context/auth/authContext'
// Custom Hooks
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/react-hooks'
// GraphQL
import { GET_MEMBERSHIPS } from '../graphql/queries'
import { CREATE_TOPIC } from '../graphql/mutations'
// Interfaces
import { Station } from '../interfaces/Station'
import { Membership } from '../interfaces/Membership'
// UI
import Select from 'react-select'
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button
} from '@chakra-ui/core'
import Loading from '../components/Loading'

type FormData = {
  title: string
  content: string
}

const CreateTopic = () => {
  // Contexts
  const { authenticated } = useContext(AuthContext)
  // Custom Hooks
  const { register, handleSubmit, errors } = useForm<FormData>()
  // Mutation
  const [createTopic, { loading: mutationLoading }] = useMutation(CREATE_TOPIC)
  // Queries
  const { data: query, loading: queryLoading } = useQuery(GET_MEMBERSHIPS)
  // States
  const [stations, setStations] = useState<Array<any>>([])
  const [station, setStation] = useState<Station | undefined>()
  // UI
  const toast = useToast()
  // Validation
  const validation = {
    title(value: string) {
      if (validator.isLength(value, { min: 2, max: 28 })) return true
      if (value.length > 28) return 'Topic title exceeded maximum length of 28'
      return 'Topic title has minimum length of 2'
    },

    content(value: string) {
      if (validator.isLength(value, { min: 2, max: 1024 })) return true
      if (value.length > 1024)
        return 'Topic content exceeded maximum length of 1024'
      return 'Topic content has minimum length of 2'
    }
  }
  // Form Submission
  const onSubmit = handleSubmit(async ({ title, content }) => {
    // Mutation Variables
    const variables = {
      data: {
        title,
        content,
        station
      }
    }

    // GraphQL Request
    try {
      await createTopic({ variables })

      toast({
        title: `Topic is created!`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Topic creation failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })
  // UseEffect - On Query Load
  useEffect(() => {
    if (query) {
      const { userMemberships }: { userMemberships: Membership[] } = query
      const subscribed = userMemberships.map(membership => ({
        value: membership.station.id,
        label: membership.station.name
      }))
      setStations(subscribed)
    }
  }, [query])

  if (!authenticated) return <Redirect to='/explore' />
  if (queryLoading) return <Loading />

  return (
    <div className='flex flex-col flex-grow'>
      Create Topic
      <form onSubmit={onSubmit}>
        <FormControl className='form-control'>
          <FormLabel htmlFor='station'>Station</FormLabel>
          <Select
            placeholder='Select Station'
            isSearchable
            options={stations}
            tabIndex='1'
            name='station'
            onChange={option => setStation(option.value)}
          />
        </FormControl>

        <FormControl className='form-control' isInvalid={!!errors.title}>
          <FormLabel htmlFor='title'>Name</FormLabel>
          <Input
            id='title'
            tabIndex={2}
            name='title'
            placeholder='Reich'
            ref={register({ validate: validation.title })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl className='form-control' isInvalid={!!errors.content}>
          <FormLabel htmlFor='content'>Content</FormLabel>
          <Textarea
            resize='none'
            tabIndex={3}
            id='content'
            name='content'
            placeholder=''
            ref={register({ validate: validation.content })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          tabIndex={4}
          isLoading={mutationLoading}
          type='submit'
          variantColor='green'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreateTopic
