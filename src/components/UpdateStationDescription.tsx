import React, { useContext, useState, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import {
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button
} from '@chakra-ui/core'
import useGradient from '../hooks/useGradient'
import StationContext from '../context/station/stationContext'
import validator from 'validator'
import { UPDATE_STATION } from '../graphql/mutations'
import { useMutation } from '@apollo/react-hooks'

type FormData = {
  description: string
}

const UpdateStationDescription = () => {
  const { station, setStation } = useContext(StationContext)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const toast = useToast()
  const [[bg]] = useGradient()
  const [updateStation, { loading }] = useMutation(UPDATE_STATION)
  const [description, setDescription] = useState(station?.description)

  const validation = {
    description: (value: string) => {
      if (validator.isLength(value, { max: 200 })) return true
      return 'Description has exceeded maximum length of 200 characters.'
    }
  }

  const onSubmit = handleSubmit(async ({ description }) => {
    const variables = {
      id: station?.id,
      data: {
        description
      }
    }

    try {
      const {
        data: { updateStation: station }
      } = await updateStation({ variables })

      toast({
        title: `Successfully updated description.`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      setStation(station)
    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Creating station failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <div id='update-description' className={`${bg} update-option`}>
      <form onSubmit={onSubmit} autoComplete='off'>
        <FormControl className='form-control' isInvalid={!!errors.description}>
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setDescription(e.currentTarget.value)
            }
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

        <Button
          tabIndex={3}
          isLoading={loading}
          type='submit'
          variantColor='green'>
          Update
        </Button>
      </form>
    </div>
  )
}

export default UpdateStationDescription
