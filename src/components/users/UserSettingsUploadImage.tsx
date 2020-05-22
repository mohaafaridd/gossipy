import React, { ChangeEvent, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER } from '../../graphql/mutations'
import { Input, Button } from '@chakra-ui/core'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../context/index'

const UserSettingsUploadImage = () => {
  const { setUser } = useContext(AuthContext)

  const [mutate, { loading }] = useMutation(UPDATE_USER)
  const [cookies, setCookie] = useCookies(['token', 'user'])

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { validity, files } = e.target
    const [image] = files

    if (validity.valid) {
      const { data } = await mutate({
        variables: {
          data: {},
          image
        }
      })

      setCookie('user', data.updateUser, {
        path: '/'
      })
      setUser(data.updateUser)
    }
  }

  return (
    <Button as='label' isLoading={loading} className='mx-auto my-2'>
      Upload Avatar
      <input type='file' onChange={onChange} style={{ display: 'none' }} />
    </Button>
  )
}

export default UserSettingsUploadImage
