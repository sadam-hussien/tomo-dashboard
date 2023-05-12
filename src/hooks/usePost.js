import { useMutation, useQueryClient } from "react-query";

// import { alertSuccess, alertError } from "components";

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
      if (queryKey) {
        queryClient.invalidateQueries(queryKey);
      }
      // create suceess alert
      // alertSuccess({ subtitle: data.data.message });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      // create error alert
      // alertError({ subtitle: error.response.data.message });
    },
  });
}
