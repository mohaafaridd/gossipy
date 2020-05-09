import React, { useContext, useState, useRef, Fragment } from 'react'
import {
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter
} from '@chakra-ui/core'
import { Topic } from '../interfaces'
import { TopicContext } from '../context/index'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_TOPIC } from '../graphql/mutations'

const TopicCardDeleteBtn = ({ topic }: { topic: Topic }) => {
  const toast = useToast()
  const { deleteTopic: pullTopic } = useContext(TopicContext)

  const [alertOpen, setAlertOpen] = useState(false)
  const onAlertClose = () => setAlertOpen(false)
  const cancelRef = useRef(null)

  const [deleteTopic, { loading }] = useMutation(DELETE_TOPIC)

  const handleDelete = async () => {
    try {
      await deleteTopic({ variables: { id: topic.id } })

      pullTopic(topic)
      toast({
        status: 'success',
        title: `Topic deleted`
      })
    } catch (error) {
      console.log('error', error)
      toast({
        status: 'error',
        title: `Error has occurred`
      })
    }
  }

  return (
    <Fragment>
      <Button
        isLoading={loading}
        onClick={() => setAlertOpen(true)}
        className='btn'
        variant='ghost'
        leftIcon='delete'
        variantColor='red'>
        Delete
      </Button>

      <AlertDialog
        isCentered
        isOpen={alertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}>
        <AlertDialogOverlay />
        <AlertDialogContent className='m-2 rounded-md'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Topic?
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}

export default TopicCardDeleteBtn
