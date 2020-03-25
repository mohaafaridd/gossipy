import React, {
  useContext,
  useState,
  FormEvent,
  useEffect,
  ChangeEvent
} from 'react'
import { useForm } from 'react-hook-form'
import {
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button,
  Switch
} from '@chakra-ui/core'
import useGradient from '../hooks/useGradient'
import StationContext from '../context/station/stationContext'
import validator from 'validator'
import { UPDATE_STATION } from '../graphql/mutations'
import { useMutation } from '@apollo/react-hooks'

type FormData = {
  public: boolean
}

const UpdateStationDescription = () => {
  const { station, setStation } = useContext(StationContext)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const toast = useToast()
  const [[bg]] = useGradient()
  const [updateStation, { loading }] = useMutation(UPDATE_STATION)
  const [isPublic, setIsPublic] = useState<boolean>(station?.public || false)

  useEffect(() => {
    setIsPublic(station?.public || false)
  }, [station])

  const onSubmit = handleSubmit(async ({ public: isPublic }) => {
    const variables = {
      id: station?.id,
      data: {
        public: isPublic
      }
    }

    try {
      const {
        data: { updateStation: station }
      } = await updateStation({ variables })

      toast({
        title: `Station is now ${isPublic ? 'public' : 'private'}`,
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      setStation(station)
    } catch (error) {
      toast({
        title: 'Updating station privacy failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit} autoComplete='off'>
        <FormControl className='form-control'>
          <FormLabel htmlFor='public-trigger'>Public Station</FormLabel>
          <Switch
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setIsPublic(e.currentTarget.checked)
            }
            isChecked={isPublic}
            name='public'
            id='public-trigger'
            ref={register}
          />
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
