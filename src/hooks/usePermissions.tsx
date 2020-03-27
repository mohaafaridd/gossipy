import { Role, MembershipState } from '../interfaces/Membership'

interface Options {
  accept: boolean
  ban: boolean
  kick: boolean
  level: boolean
  unban: boolean
}

interface Permissions {
  FOUNDER: Options
  ADMIN: Options
  MODERATOR: Options
  MEMBER: Options
}

interface Actions {
  ACTIVE: Options
  PENDING: Options
  BANNED: Options
  DETACHED: Options
}

export default function usePermissions(
  userRole: Role = 'MEMBER',
  targetState: MembershipState = 'DETACHED'
) {
  const permissions: Permissions = {
    FOUNDER: {
      accept: true,
      ban: true,
      kick: true,
      level: true,
      unban: true
    },
    ADMIN: {
      accept: true,
      ban: true,
      kick: true,
      level: false,
      unban: true
    },
    MODERATOR: {
      accept: false,
      ban: false,
      kick: true,
      level: false,
      unban: false
    },
    MEMBER: {
      accept: false,
      ban: false,
      kick: false,
      level: false,
      unban: false
    }
  }

  const actions: Actions = {
    ACTIVE: {
      accept: false,
      ban: true,
      kick: true,
      level: true,
      unban: false
    },

    PENDING: {
      accept: true,
      ban: false,
      kick: false,
      level: false,
      unban: false
    },

    BANNED: {
      accept: false,
      ban: false,
      kick: false,
      level: false,
      unban: true
    },

    DETACHED: {
      accept: false,
      ban: false,
      kick: false,
      level: false,
      unban: false
    }
  }

  const permission = permissions[userRole]
  const action = actions[targetState]

  return [permission, action]
}
