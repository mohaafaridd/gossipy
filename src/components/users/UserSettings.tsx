import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import UserSettingEmailForm from './UserSettingsEmailForm'
import UserSettingsPasswordForm from './UserSettingsPasswordForm'
import { User } from '../../interfaces/User'
import UserSettingsUploadImage from './UserSettingsUploadImage'

const UserSettings = ({ profile }: { profile: User }) => {
  const { authenticated, user } = useContext(AuthContext)

  if (!authenticated) return <Redirect to='/explore' />

  if (profile.identifier !== user?.identifier)
    return <Redirect to={`/u/${user?.identifier}/settings`} />

  return (
    <div id='user-settings'>
      <h3>User Settings</h3>
      <UserSettingsUploadImage />
      <UserSettingEmailForm />
      <UserSettingsPasswordForm />
    </div>
  )
}

export default UserSettings
