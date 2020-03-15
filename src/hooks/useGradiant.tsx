import { useColorMode } from '@chakra-ui/core'

export default function useGradiant() {
  const { colorMode } = useColorMode()

  const bgGradiants =
    colorMode === 'light'
      ? ['bg-gray-100', 'bg-gray-200', 'bg-gray-400']
      : ['bg-gray-700', 'bg-gray-800', 'bg-gray-900']

  const textGradiants =
    colorMode === 'light'
      ? ['text-gray-600', 'text-gray-700', 'text-gray-800']
      : ['text-gray-700', 'text-gray-800', 'text-gray-900']

  return [bgGradiants, textGradiants]
}
