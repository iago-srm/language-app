import { ServerError } from "@language-app/common-utils";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

export type IUseApiCallResponse<R> = {
  data: R;
  loading: boolean;
  error: ServerError;
};

export const useApiCallSWR = <R>(
  key: any,
  fetcher: (url: string) => Promise<any>,
  options?: any
) => {
  const { data, error, isValidating, mutate } = useSWR(key, fetcher, options);
  // console.log('mutate');
  return {
    data: data as R,
    loading: isValidating,
    error: error as ServerError,
    mutate,
  };
};

export const useApiCallSWRPaginated = <R>(
  key: any,
  fetcher: (url: string) => Promise<any>,
  pageSize: number,
  options?: any
) => {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    key,
    fetcher,
    options
  );
  // console.log({data}) // an array, each position a page.
  // page has data and cursor. data is an array with items
  return {
    data: data ? [].concat(...data.map((d) => d.data)) : [],
    loading: isValidating,
    error: error as ServerError,
    mutate,
    setSize,
    hasNoMore:
      !data?.[data?.length - 1]?.cursor ||
      data?.[data?.length - 1].data.length < pageSize,
  };
};
