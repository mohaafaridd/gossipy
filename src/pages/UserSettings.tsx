import React, { useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import UserSettingEmailForm from '../components/UserSettingsEmailForm'
import UserSettingsPasswordForm from '../components/UserSettingsPasswordForm'

const UserSettings = () => {
  const { authenticated, user } = useContext(AuthContext)
  const { identifier } = useParams()

  if (!authenticated) return <Redirect to='/explore' />

  if (identifier !== user?.identifier)
    return <Redirect to={`/u/${user?.identifier}/settings`} />

  return (
    <div id='user-settings'>
      <h2>User Settings</h2>
      <UserSettingEmailForm />
      <UserSettingsPasswordForm />
    </div>
  )
}

export default UserSettings
