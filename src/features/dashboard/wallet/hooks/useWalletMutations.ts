import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletApi } from "../services/walletApi";
import type { WithdrawalRequestPayload } from "../services/walletApi";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
// Hook for creating withdrawal requests
export const useCreateWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawalRequestPayload) =>
      walletApi.createWithdrawalRequest(data),
    onSuccess: () => {
      // Invalidate and refetch withdrawal requests and wallet balance
      queryClient.invalidateQueries({ queryKey: ["withdrawalRequests"] });
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
      toast.success("تم إرسال طلب السحب بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء إرسال طلب السحب";
      toast.error(errorMessage);
      console.error("Error creating FAQ:", error);
    },
  });
};
