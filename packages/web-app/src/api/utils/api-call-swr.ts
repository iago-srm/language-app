import { ServerError } from './types';
import useSWR, { useSWRConfig } from 'swr';

export type IUseApiCallResponse<R> = {
  data: R;
  loading: boolean;
  error: ServerError;
}

export const useApiCall = <R>(key: any, fetcher: (url: string) => Promise<any>) => {
  const { data, error } = useSWR(key, fetcher);

  return {
    data: !error && data as R,
    loading: !error && !data,
    error: error as ServerError
  }
}
