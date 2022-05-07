import useSWR from 'swr';

export const useApiCall = (url: string, fetcher: (url: string) => Promise<any>) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    loading: !error && !data,
    error
  }
}
