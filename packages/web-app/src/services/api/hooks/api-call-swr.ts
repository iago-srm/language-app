import { ServerError } from '@language-app/common-utils';
import useSWR from 'swr';

export type IUseApiCallResponse<R> = {
  data: R;
  loading: boolean;
  error: ServerError;
}

export const useApiCallSWR = <R>(key: any, fetcher: (url: string) => Promise<any>, options?: any) => {
  const { data, error, isValidating, mutate } = useSWR(key, fetcher, options);
  // console.log('mutate');
  return {
    data: data as R,
    loading: isValidating,
    error: error as ServerError,
    mutate
  }
}
