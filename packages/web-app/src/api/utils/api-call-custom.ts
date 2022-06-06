import React from 'react'
import { ServerError } from './types'

export const useApiCall = <Params = any, Resp = any>(
  usecase: (p: Params) => Promise<Resp>
) => {
  const [error, setError] = React.useState<ServerError>()
  const [loading, setLoading] = React.useState(false)

  const apiCall = React.useCallback(
    async (args?: Params) => {
      setLoading(true)
      try {
        const resp = await usecase(args)
        // setError({ status: undefined, message: "" })
        setLoading(false)
        return resp;
      } catch (e) {
        console.log('apiCallCustom error',e)
        setLoading(false)
        setError(e);
      }
    },
    [setLoading, setError, /*setResponse,*/ usecase]
  )

  return {
    apiCall,
    loading,
    error,
  }
}
