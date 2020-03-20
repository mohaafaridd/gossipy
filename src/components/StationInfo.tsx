import React, { useState, useContext, useEffect, Fragment } from 'react'
import moment from 'moment'
import { Station } from '../interfaces/Station'
import { Membership } from '../interfaces/Membership'
import useGradiant from '../hooks/useGradiant'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loading from './Loading'
import AuthContext from '../context/auth/authContext'
import {
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/core'

import StationSubscribeButton from './StationSubscribeButton'
import StationContext from '../context/station/stationContext'

const GET_MEMBERSHIP = gql`
  query getMembership($station: ID!) {
    userMembership(station: $station) {
      id
      state
      role
    }
  }
`

const StationInfo = ({ station }: { station: Station }) => {
  const stationContext = useContext(StationContext)
  const authContext = useContext(AuthContext)

  const [leaveIsOpen, setLeaveIsOpen] = useState(false)

  const onCloseLeave = () => setLeaveIsOpen(false)

  const cancelRef = React.useRef(null)

  const { data, loading } = useQuery(GET_MEMBERSHIP, {
    variables: {
      station: station.id
    }
  })

  const [, , [bg]] = useGradiant()
  const { topics, members } = station

  const activeMembers = members?.filter(
    membership => membership.state === 'ACTIVE'
  )

  const date = moment(station.createdAt).format('Do MMM YYYY')

  useEffect(() => {
    if (data) {
      const { userMembership }: { userMembership: Membership } = data
      stationContext.setMembership(userMembership)
    }
    // eslint-disable-next-line
  }, [data])

  if (loading) return <Loading message='Loading Membership Information' />

  return (
    <div id='station-info' className={bg}>
      <h2>{station.name}</h2>

      <small>{date}</small>

      <div className='counters'>
        <div className='counter'>
          <div>{activeMembers?.length} Members</div>
        </div>
        <div className='counter'>
          <div>{topics?.length} Topics</div>
        </div>
      </div>

      {authContext.authenticated &&
        stationContext.membership?.state !== 'ACTIVE' && (
          <StationSubscribeButton station={station} />
        )}

      {authContext.authenticated &&
        stationContext.membership?.state === 'ACTIVE' &&
        stationContext.membership.role !== 'FOUNDER' && (
          <Fragment>
            <Button
              onClick={() => setLeaveIsOpen(true)}
              className='main-btn leave-btn'>
              Leave Station
            </Button>

            <AlertDialog
              isOpen={leaveIsOpen}
              leastDestructiveRef={cancelRef}
              onClose={onCloseLeave}>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Leave Station
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onCloseLeave}>
                    Cancel
                  </Button>
                  <Button variantColor='red' onClick={onCloseLeave} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Fragment>
        )}
    </div>
  )
}

export default StationInfo
