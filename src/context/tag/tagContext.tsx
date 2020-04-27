import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/tag'

const TagContext = createContext<State & Methods>({
  createTag: () => undefined,
  updateTag: () => undefined,
  deleteTag: () => undefined,
  setTags: () => undefined,
  setTag: () => undefined
})

export const { Provider: TagProvider, Consumer } = TagContext
export default TagContext
