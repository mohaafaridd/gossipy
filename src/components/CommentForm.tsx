import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button
} from '@chakra-ui/core'
import { Topic } from '../interfaces/Topic'
import useGradient from '../hooks/useGradient'
import validator from 'validator'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_COMMENT } from '../graphql/mutations'
import TopicContext from '../context/topics/topicContext'

type FormData = {
  content: string
}

const CommentForm = ({ topic }: { topic: Topic }) => {
  const topicContext = useContext(TopicContext)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const toast = useToast()
  const [[bg, shade]] = useGradient()
  const [createComment, { loading }] = useMutation(CREATE_COMMENT)

  const validation = {
    content: (value: string) => {
      if (validator.isLength(value, { min: 1, max: 200 })) return true
      else if (value.length < 1) return 'Insert you comment'
      else if (value.length > 200)
        return 'Comment limit exceeded the 200 characters limit'
    }
  }

  const onSubmit = handleSubmit(async ({ content }) => {
    const variables = {
      data: {
        content,
        topic: topic.id
      }
    }

    try {
      const {
        data: { createComment: comment }
      } = await createComment({ variables })
      topicContext.addComment(comment)

      toast({
        title: `Comment is successfully submitted.`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Submitting comment failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <div id='comment-form' className={shade}>
      <form onSubmit={onSubmit} autoComplete='off'>
        <FormControl className='form-control' isInvalid={!!errors.content}>
          <FormLabel htmlFor='content'>Add Comment</FormLabel>
          <Textarea
            resize='none'
            tabIndex={2}
            name='content'
            type='string'
            placeholder=''
            ref={register({ validate: validation.content })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
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

export default CommentForm
