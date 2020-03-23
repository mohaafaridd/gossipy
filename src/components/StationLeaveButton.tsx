import React, { Fragment, useState, useRef, useContext } from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  useToast
} from '@chakra-ui/core'
import { Membership } from '../interfaces/Membership'
import { useMutation } from '@apollo/react-hooks'
import StationContext from '../context/station/stationContext'
import TopicContext from '../context/topics/topicContext'
import { UNSUBSCRIBE_MEMBERSHIP } from '../graphql/mutations'

const StationLeaveButton = ({ membership }: { membership: Membership }) => {
  const toast = useToast()
  const stationContext = useContext(StationContext)
  const topicContext = useContext(TopicContext)
  const [alertOpen, setAlertOpen] = useState(false)
  const onAlertClose = () => setAlertOpen(false)
  const cancelRef = useRef(null)
  const [unsubscribe, { loading }] = useMutation(UNSUBSCRIBE_MEMBERSHIP)

  const handleSubscribe = async () => {
    const { data } = await unsubscribe({ variables: { id: membership.id } })
    const {
      unsubscribeMembership
    }: { unsubscribeMembership: Membership } = data

    stationContext.setMembership(unsubscribeMembership)
    if (!unsubscribeMembership.station.public) topicContext.setTopics([])
    toast({
      status: 'success',
      title: `You've left ${unsubscribeMembership.station.name}`
    })
  }

  return (
    <Fragment>
      <Button
        isLoading={loading}
        onClick={() => setAlertOpen(true)}
        className='main-btn leave-btn'>
        Leave Station
      </Button>

      <AlertDialog
        isCentered
        isOpen={alertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}>
        <AlertDialogOverlay />
        <AlertDialogContent className='m-2 rounded-md'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Leave Station
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={handleSubscribe} ml={3}>
              Leave
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}

export default StationLeaveButton
