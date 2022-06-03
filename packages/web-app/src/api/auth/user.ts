import {
  useApiCallSWR,
  authAxiosGetFetcher,
} from "../utils";
import {
  IGetUserAPIResponse
} from '@language-app/common';

export function useUser(token: string) {
  const { data, loading, error } = useApiCallSWR<IGetUserAPIResponse>(['/user', token], authAxiosGetFetcher)

  return {
    user: data,
    loadingUser: loading,
    errorUser: error
  }
}
