import React, { ChangeEvent } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER } from '../graphql/mutations'
import { Input, Button } from '@chakra-ui/core'

const UserSettingsUploadImage = () => {
  const [mutate, { loading }] = useMutation(UPDATE_USER)

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { validity, files } = e.target
    const [image] = files

    if (validity.valid) {
      await mutate({
        variables: {
          data: {},
          image
        }
      })
    }
  }

  return (
    <Button as='label' isLoading={loading} className='mx-auto my-2'>
      Upload Avatar
      <input type='file' onChange={onChange} style={{ display: 'none' }} />
    </Button>
  )
  // return <Input type='file' isDisabled={loading} onChange={onChange} />
}

export default UserSettingsUploadImage
