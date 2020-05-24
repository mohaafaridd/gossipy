import React, { useContext, useState, ChangeEvent, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/index'
import Loading from '../components/layout/Loading'
import { GET_TOPIC } from '../graphql/queries'
import { Topic } from '../interfaces'
import BackgroundMessage from '../components/layout/BackgroundMessage'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button
} from '@chakra-ui/core'
import validator from 'validator'

type FormData = {
  title: string
  content: string
}

const UpsertTopic = () => {
  const { authenticated, user } = useContext(AuthContext)
  const [image, setImage] = useState<File | string>('')
  const { stationIdentifier, topicIdentifier } = useParams()
  const { register, handleSubmit, errors } = useForm<FormData>()

  const { data, error, loading } = useQuery<{
    topic: Topic
  }>(GET_TOPIC, {
    variables: {
      identifier: topicIdentifier,
      stationIdentifier
    }
  })

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

  return (
    <div id='edit-topic'>
      <Helmet>
        <title>Edit Topic</title>
      </Helmet>
      <h2 id='heading'>Edit Topic</h2>
      <form>
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
          // isLoading={mutationLoading}
          type='submit'
          variantColor='green'>
          Edit
        </Button>
      </form>
    </div>
  )
}

export default UpsertTopic
