import { useEffect, useRef } from 'react'

const useWatch = <T>(value:T, fn: (arg0: T, arg1: T) => void, config = { immediate: false })=> {
  const oldValue = useRef<T>()
  const isFirst = useRef(false)
  useEffect(() => {
    if (isFirst.current) {
      fn(value, oldValue.current)
    } else {
      isFirst.current = true
      if (config.immediate) {
        fn(value, oldValue.current)
      }
    }

    oldValue.current = value
  }, [value])
}

export default useWatch
