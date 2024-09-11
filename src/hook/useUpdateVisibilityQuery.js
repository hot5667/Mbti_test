import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTestResultVisibility } from "../api/testResults";

export const useUpdateVisibilityQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, visibility }) =>
      updateTestResultVisibility(id, visibility),
    onSuccess: () => queryClient.invalidateQueries(["testResult"]),
    onError: (error) => {
      console.error("Visibility toggle failed:", error);
      alert("Visibility toggle failed. Please try again.");
    },
  });
};