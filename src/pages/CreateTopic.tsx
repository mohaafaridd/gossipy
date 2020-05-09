import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import validator from 'validator'
import { Helmet } from 'react-helmet'
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
  Button,
  useColorMode
} from '@chakra-ui/core'
import Loading from '../components/Loading'
import useGradient from '../hooks/useGradient'
import { AuthContext } from '../context/'
import { Tag } from '../interfaces'

type FormData = {
  title: string
  content: string
}

const CreateTopic = ({ id }: { id?: number }) => {
  // Contexts
  const { authenticated, user } = useContext(AuthContext)
  // Custom Hooks
  const { register, handleSubmit, errors } = useForm<FormData>()
  const history = useHistory()
  // Mutation
  const [createTopic, { loading: mutationLoading }] = useMutation(CREATE_TOPIC)
  // Queries
  const { data: query, loading: queryLoading, error } = useQuery(
    GET_MEMBERSHIPS,
    {
      variables: {
        user: user?.id,
        states: ['ACTIVE']
      }
    }
  )
  // States
  const [stations, setStations] = useState<Array<any>>([])
  const [tags, setTags] = useState<Array<any>>([])
  const [station, setStation] = useState<Station | undefined>()
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [image, setImage] = useState<File | undefined>(undefined)
  // UI
  const toast = useToast()
  const [[bg]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

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
      },
      image
    }

    // GraphQL Request
    try {
      const { data } = await createTopic({ variables })
      toast({
        title: `Topic is created!`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      history.push(
        `/s/${data.createTopic.station.identifier}/${data.createTopic.identifier}`
      )
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
      const {
        memberships
      }: {
        memberships: {
          data: Membership[]
          count: number
        }
      } = query
      const subscribed = memberships.data.map(membership => ({
        value: membership.station.id,
        label: membership.station.name,
        identifier: membership.station.identifier
      }))
      setStations(subscribed)
    }
  }, [query])

  useEffect(() => {
    if (station) {
      const tagsOptions = station.tags.map(tag => ({
        value: tag.id,
        label: tag.name
      }))

      setTags(tagsOptions)
    }
  }, [station])

  if (!authenticated) return <Redirect to='/explore' />
  if (queryLoading) return <Loading />

  const onImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = e.target
    const [file] = files
    if (validity.valid) setImage(file)
  }

  return (
    <div id='create-topic' className={`${bg} ${borderClass}`}>
      <Helmet>
        <title>Create Topic</title>
      </Helmet>
      <h2 id='heading'>Create Topic</h2>
      <form onSubmit={onSubmit}>
        <FormControl className='form-control'>
          <FormLabel htmlFor='station'>Station</FormLabel>
          <Select
            className='text-black'
            placeholder='Select Station'
            isSearchable
            options={stations}
            tabIndex='1'
            name='station'
            onChange={option => setStation(option.value)}
          />
        </FormControl>

        <FormControl className='form-control'>
          <FormLabel htmlFor='tags'>Tags</FormLabel>
          <Select
            isMulti
            className='text-black'
            placeholder='Select Station'
            isSearchable
            options={tags}
            tabIndex='2'
            name='tags'
            onChange={option => setSelectedTags(option.value)}
          />
        </FormControl>

        <FormControl className='form-control' isInvalid={!!errors.title}>
          <FormLabel htmlFor='title'>Name</FormLabel>
          <Input
            id='title'
            tabIndex={3}
            name='title'
            placeholder='Stairways to heaven'
            ref={register({ validate: validation.title })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl className='form-control' isInvalid={!!errors.content}>
          <FormLabel htmlFor='content'>Content</FormLabel>
          <Textarea
            size='lg'
            resize='vertical'
            tabIndex={4}
            id='content'
            name='content'
            placeholder=''
            ref={register({ validate: validation.content })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>

        {image ? (
          <Button className='mx-auto' onClick={() => setImage(undefined)}>
            Remove Image
          </Button>
        ) : (
          <Button className='mx-auto' as='label'>
            Upload an image
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={onImageSelection}
            />
          </Button>
        )}

        <Button
          tabIndex={5}
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
