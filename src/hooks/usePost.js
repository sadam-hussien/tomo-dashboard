import { useMutation, useQueryClient } from "react-query";

import { Toast } from "components";

export default function usePost({
  queryFn,
  queryKey,
  successMsg,
  errorMsg,
  onSuccess,
}) {
  const queryClient = useQueryClient();
  return useMutation(queryFn, {
    onSuccess: (data) => {
      if (data?.data?.message) {
        Toast({ icon: "success", title: data.data.message });
      } else {
        Toast({ icon: "success", title: data.message });
      }
      if (queryKey) {
        queryClient.invalidateQueries(queryKey);
      }
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (Array.isArray(error.data?.errors)) {
        error.data.errors.forEach((item) => {
          Toast({ icon: "error", title: item });
        });
      }

      if (Array.isArray(error.data?.message)) {
        error.data.message.forEach((item) => {
          Toast({ icon: "error", title: item });
        });
      }
    },
  });
}
