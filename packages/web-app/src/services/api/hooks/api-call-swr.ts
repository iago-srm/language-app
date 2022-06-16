import { ServerError } from '@language-app/common';
import useSWR from 'swr';

export type IUseApiCallResponse<R> = {
  data: R;
  loading: boolean;
  error: ServerError;
}

export const useApiCallSWR = <R>(key: any, fetcher: (url: string) => Promise<any>, options?: any) => {
  const { data, error } = useSWR(key, fetcher, options);
  return {
    data: !error && data as R,
    loading: !error && !data && key,
    error: error as ServerError
  }
}
