import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTestResult } from "../api/testResults";

export const useDeleteResultQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteTestResult(id),
    onSuccess: () => queryClient.invalidateQueries(["testResult"]),
    onError: (error) => {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    },
  });
};