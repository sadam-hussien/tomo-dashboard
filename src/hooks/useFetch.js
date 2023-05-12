import { useQuery } from "react-query";

export default function useFetch({ queryKey, queryFn, options }) {
  return useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...options,
  });
}
