import { Role, MembershipState } from '../interfaces/Membership'

export default function useBadgeColor(key: Role | MembershipState) {
  switch (key) {
    case 'BANNED':
      return 'red'

    case 'ACTIVE':
    case 'MEMBER':
      return 'green'

    case 'PENDING':
    case 'DETACHED':
      return 'gray'

    case 'ADMIN':
      return 'purple'

    case 'FOUNDER':
      return 'pink'

    case 'MODERATOR':
      return 'orange'

    default:
      break
  }
}
