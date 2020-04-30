import React, {
  useState,
  useContext,
  useEffect,
  ChangeEvent,
  FormEvent
} from 'react'
import { Input, Button, useToast } from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { TagContext, StationContext } from '../context/'
import { CREATE_TAG, UPDATE_TAG } from '../graphql/mutations'

const CreateTagForm = () => {
  const { station } = useContext(StationContext)
  const { tag, setTag } = useContext(TagContext)
  const [name, setName] = useState('')
  const [createTag, { loading: tagCreationLoading }] = useMutation(CREATE_TAG)
  const [updateTag, { loading: tagUpdateLoading }] = useMutation(UPDATE_TAG)
  const toast = useToast()

  useEffect(() => {
    setName(tag?.name || '')
  }, [tag])

  const onCreate = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await createTag({
        variables: {
          stationId: station?.id,
          data: {
            name
          }
        }
      })

      setTag(data.createTag)

      toast({
        title: 'Tag Created',
        duration: 2000,
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Operation Failed',
        duration: 2000,
        status: 'error'
      })
    }
  }

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await updateTag({
        variables: {
          id: tag?.id,
          data: {
            name
          }
        }
      })

      setTag(undefined)

      toast({
        title: 'Tag Updated',
        duration: 2000,
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Operation Failed',
        duration: 2000,
        status: 'error'
      })
    }
  }

  return (
    <form
      onSubmit={tag ? onUpdate : onCreate}
      className='grid gap-2 grid-cols-12 w-full md:w-2/3 xl:w-1/3 mx-auto'>
      <Input
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className='col-start-1 col-span-10'
        placeholder='Tag name...'
      />
      <Button
        type='submit'
        isLoading={tagCreationLoading || tagUpdateLoading}
        className='col-start-11 col-span-2'
        variantColor='green'
        leftIcon={tag ? 'edit' : 'add'}>
        {tag ? 'Edit' : 'Create'}
      </Button>
    </form>
  )
}

export default CreateTagForm
