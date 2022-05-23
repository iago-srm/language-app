import { ServerError } from './types';
import useSWR from 'swr';

export const useApiCall = <R = any>(key: any[], fetcher: (url: string) => Promise<any>) => {
  const { data, error } = useSWR(key, fetcher);

  return {
    data: data as R,
    loading: !error && !data,
    error: error as ServerError
  }
}
