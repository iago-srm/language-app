import React from 'react'
import { ServerError } from '@language-app/common-utils'

export type UseApiCallResponse<P,R> =
//  = ReturnType<typeof useApiCall>
{
  apiCall: (args?: P) =>
    Promise<{ response?: R; error?: ServerError }>,
  loading: boolean
}

// type UseApiCall<P,R> = (args: (p: P) => Promise<R>) => UseApiCallResponse<P,R>

export const useApiCall = <Params = any, Resp = any>(
  usecase
) => {
  const [loading, setLoading] = React.useState(false)

  const apiCall = React.useCallback(
    async (args?: Params) => {
      setLoading(true);
      let response: Resp;
      let error: ServerError;
      try {
        response = await usecase(args);
        setLoading(false);
        error = undefined;
      } catch (e) {
        setLoading(false);
        response = undefined;
        error = e;
      }

      return {
        response,
        error
      }

    },
    [setLoading, usecase]
  )

  return {
    apiCall,
    loading,
  }
}

