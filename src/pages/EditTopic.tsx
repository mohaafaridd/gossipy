import React, { useContext, useState, ChangeEvent, useEffect } from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  useToast,
  useColorMode
} from '@chakra-ui/core'
import validator from 'validator'
import { AuthContext } from '../context/index'
import Loading from '../components/layout/Loading'
import { GET_TOPIC } from '../graphql/queries'
import { Topic } from '../interfaces'
import BackgroundMessage from '../components/layout/BackgroundMessage'
import { EDIT_TOPIC } from '../graphql/mutations'
import useGradient from '../hooks/useGradient'

type FormData = {
  title: string
  content: string
}

const UpsertTopic = () => {
  const { authenticated, user } = useContext(AuthContext)
  const [image, setImage] = useState<File | string>('')
  const { stationIdentifier, topicIdentifier } = useParams()
  const { register, handleSubmit, errors } = useForm<FormData>()
  const history = useHistory()
  const toast = useToast()
  const [[bg]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  const { data, error, loading } = useQuery<{
    topic: Topic
  }>(GET_TOPIC, {
    variables: {
      identifier: topicIdentifier,
      stationIdentifier
    }
  })

  const [editTopic, { loading: mutationLoading }] = useMutation(EDIT_TOPIC)

  useEffect(() => {
    if (data) {
      setImage(data.topic.image)
    }
  }, [data])

  if (!authenticated) return <Redirect to='/' />
  if (loading) return <Loading />
  if (error || typeof data === 'undefined')
    return <BackgroundMessage type='Error' message='Error accrued' />

  const { topic } = data
  if (topic.user.id !== user?.id) return <Redirect to='/gossip' />

  // Form Validation
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

  const onImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = e.target
    const [file] = files
    if (validity.valid) setImage(file)
  }

  const onSubmit = handleSubmit(async ({ title, content }) => {
    const variables: {
      id: string
      image: File | string
      data: FormData
    } = {
      id: topic.id,
      data: {
        title,
        content
      },
      image: topic.image
    }

    const imageChanged = topic.image !== image
    const titleChanged = topic.title !== title
    const contentChanged = (topic.content = content)
    imageChanged ? (variables.image = image) : delete variables.image
    !titleChanged && delete variables.data.title
    !contentChanged && delete variables.data.content

    console.log('variables', variables)

    try {
      const { data } = await editTopic({ variables })

      toast({
        title: `Topic is created!`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      toast({
        title: 'Image updates may take a while'
      })

      history.push(
        `/s/${data.updateTopic.station.identifier}/${data.updateTopic.identifier}`
      )
    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Topic update failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <div id='edit-topic' className={`${bg} ${borderClass}`}>
      <Helmet>
        <title>Edit Topic</title>
      </Helmet>
      <h2 id='heading'>Edit Topic</h2>
      <form onSubmit={onSubmit}>
        <FormControl className='form-control' isInvalid={!!errors.title}>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input
            defaultValue={topic.title}
            autoComplete='off'
            id='title'
            tabIndex={1}
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
            defaultValue={topic.content}
            size='lg'
            resize='vertical'
            tabIndex={2}
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
          <Button className='mx-auto' onClick={() => setImage('')}>
            Remove Image
          </Button>
        ) : (
          <Button className='mx-auto' as='label'>
            Upload an image
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={onImageSelection}
              accept='image/*'
            />
          </Button>
        )}

        <Button
          tabIndex={3}
          isLoading={mutationLoading}
          type='submit'
          variantColor='green'>
          Edit
        </Button>
      </form>
    </div>
  )
}

export default UpsertTopic
