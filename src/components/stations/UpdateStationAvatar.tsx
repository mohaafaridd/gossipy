import React, { useContext, ChangeEvent, Fragment } from 'react'
import { StationContext } from '../../context/index'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATION } from '../../graphql/mutations'
import { Avatar, Button } from '@chakra-ui/core'

const UpdateStationAvatar = () => {
  const { station, setStation } = useContext(StationContext)

  const [mutate, { loading }] = useMutation(UPDATE_STATION)

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { validity, files } = e.target
    const [image] = files

    if (validity.valid) {
      const { data } = await mutate({
        variables: {
          id: station?.id,
          data: {},
          image
        }
      })

      setStation(data.updateStation)
    }
  }
  return (
    <div className='flex mx-auto flex-col'>
      <Avatar
        alignSelf='center'
        size='2xl'
        src={`${process.env.REACT_APP_S3}/${station?.image}`}
      />

      <Button as='label' isLoading={loading} className='mx-auto my-2'>
        Upload Avatar
        <input type='file' onChange={onChange} style={{ display: 'none' }} />
      </Button>
    </div>
  )
}

export default UpdateStationAvatar
