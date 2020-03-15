import { Vote } from './Vote'

export interface User {
  id: string
  identifier: string
  name: string
  email: string
  karma: Vote[]
}
