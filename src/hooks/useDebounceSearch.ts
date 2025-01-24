import { useState, useEffect, Dispatch, SetStateAction } from 'react'

const useDebounceSearch = <T>(
  defaultValue: T,
  delay: number
): [T, T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(defaultValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, value, setValue]
}

export default useDebounceSearch
