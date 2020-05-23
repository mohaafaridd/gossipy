import React, { useContext, useState, ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button,
  useColorMode
} from '@chakra-ui/core'
import { Topic } from '../../interfaces/Topic'
import useGradient from '../../hooks/useGradient'
import validator from 'validator'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_COMMENT, UPDATE_COMMENT } from '../../graphql/mutations'
import { CommentContext } from '../../context/index'

type FormData = {
  content: string
}

const CommentForm = ({ topic }: { topic: Topic }) => {
  const { comment, setComment, createComment: pushComment } = useContext(
    CommentContext
  )

  const [value, setValue] = useState(comment?.content)
  const { register, handleSubmit, errors } = useForm<FormData>()

  const [createComment, { loading: creationLoading }] = useMutation(
    CREATE_COMMENT
  )

  const [updateComment, { loading: updateLoading }] = useMutation(
    UPDATE_COMMENT
  )

  const toast = useToast()
  const [[, shade]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  useEffect(() => {
    if (comment) setValue(comment.content)
    else setValue('')
  }, [comment])

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
      pushComment(comment)
      setComment(undefined)
      toast({
        title: `Comment is successfully submitted.`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Submitting comment failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  const onUpdate = handleSubmit(async ({ content }) => {
    const variables = {
      id: comment?.id,
      data: {
        content
      }
    }

    try {
      await updateComment({ variables })
      setComment(undefined)
      toast({
        title: `Comment is successfully updated.`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'update comment failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <div id='comment-form' className={`${shade} ${borderClass}`}>
      <form onSubmit={comment ? onUpdate : onSubmit} autoComplete='off'>
        <FormControl className='form-control' isInvalid={!!errors.content}>
          <FormLabel htmlFor='content'>
            {comment ? 'Edit Comment' : 'Add Comment'}
          </FormLabel>
          <Textarea
            resize='none'
            tabIndex={1}
            name='content'
            type='string'
            placeholder=''
            ref={register({ validate: validation.content })}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          tabIndex={2}
          isLoading={creationLoading || updateLoading}
          type='submit'
          variantColor='green'>
          {comment ? 'Edit' : 'Create'}
        </Button>

        {comment && (
          <Button variant='ghost' onClick={() => setComment(undefined)}>
            Clear
          </Button>
        )}
      </form>
    </div>
  )
}

export default CommentForm
