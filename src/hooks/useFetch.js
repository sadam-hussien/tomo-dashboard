import { useQuery } from "react-query";

import { Toast } from "components";

export default function useFetch({ queryKey, queryFn, options }) {
  return useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...options,
    onError: (error) => {
      if (Array.isArray(error.data?.errors)) {
        error.data.errors.forEach((item) => {
          Toast({ icon: "error", title: item });
        });
      }
    },
  });
}
