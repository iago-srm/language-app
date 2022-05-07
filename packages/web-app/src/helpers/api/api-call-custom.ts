import React from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { ServerError } from '@iagosrm/common'

export interface ApiError extends ServerError {
  status?: number
}

export const useApiCall = <Params = any, Resp = any>(
  usecase: (p: Params) => Promise<AxiosResponse<Resp>>
) => {
  const [errors, setErrors] = React.useState<ApiError>({
    status: undefined,
    errors: [],
  })
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState<
    { status: number; data: Resp } | undefined
  >(undefined)

  const apiCall = React.useCallback(
    async (args?: Params) => {
      setLoading(true)
      try {
        const resp = await usecase(args)
        // console.log(resp)
        if (typeof resp.data === 'string' || resp.data) {
          setResponse({ data: resp.data, status: resp.status })
        }
        setErrors({ status: undefined, errors: [] })
      } catch (e) {
        setResponse(undefined)
        if (e && e.response) {
          const axiosError = e as AxiosError<ServerError>
          if (axiosError.response) {
            setErrors({
              status: axiosError.response?.status,
              errors: axiosError.response?.data.errors,
            })
          } else {
            setErrors({
              status: 500,
              errors: [{ message: 'Server responded with an undefined error' }],
            })
          }
        } else {
          setErrors({
            status: 418,
            errors: [
              {
                message:
                  'Something went wrong processing your request: ' + e.message,
              },
            ],
          })
        }
      }
      setLoading(false)
    },
    [setLoading, setErrors, setResponse, usecase]
  )

  return {
    apiCall,
    errors,
    loading,
    response,
  }
}
