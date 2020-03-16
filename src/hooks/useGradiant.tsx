import { useColorMode } from '@chakra-ui/core'

export default function useGradiant() {
  const { colorMode } = useColorMode()

  const bgGradiants =
    colorMode === 'light'
      ? ['bg-gray-200', 'bg-gray-300', 'bg-gray-500']
      : ['bg-gray-700', 'bg-gray-800', 'bg-gray-900']

  const textGradiants =
    colorMode === 'light'
      ? ['text-gray-600', 'text-gray-700', 'text-gray-800']
      : ['text-gray-700', 'text-gray-800', 'text-gray-900']

  const bgDefault = colorMode === 'light' ? 'white' : 'bg-gray-800'

  return [bgGradiants, textGradiants, [bgDefault]]
}
