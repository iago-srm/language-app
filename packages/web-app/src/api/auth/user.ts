import {
  useApiCallSWR,
  authAxiosGetFetcher,
} from "../utils";
import {
  GetUserAPIResponse
} from '@language-app/common';

export function useUser(token: string) {
  const { data, loading, error } = useApiCallSWR<GetUserAPIResponse>(['/user', token], authAxiosGetFetcher)

  return {
    user: data,
    loadingUser: loading,
    errorUser: error
  }
}
