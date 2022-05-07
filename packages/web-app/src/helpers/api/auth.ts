import { useApiCall } from "@helpers";
import {
  authAxiosGetFetcher
} from "./axios";

export function useUser<R>() {
  const { data, loading, error } = useApiCall('/user', authAxiosGetFetcher)

  return {
    user: data as R,
    loading,
    error
  }
}
