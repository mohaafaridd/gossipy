import { useColorMode } from '@chakra-ui/core'

export default function useGradient() {
  const { colorMode } = useColorMode()

  const bgGradients =
    colorMode === 'light'
      ? ['bg-gray-200', 'bg-gray-300', 'bg-gray-500']
      : ['bg-gray-700', 'bg-gray-800', 'bg-gray-900']

  const textGradients =
    colorMode === 'light'
      ? ['text-gray-600', 'text-gray-700', 'text-gray-800']
      : ['text-gray-700', 'text-gray-800', 'text-gray-900']

  const bgDefault = colorMode === 'light' ? 'white' : 'bg-gray-800'

  return [bgGradients, textGradients, [bgDefault]]
}
