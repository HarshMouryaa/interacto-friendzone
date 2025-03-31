
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "@/api/api";

export const useConversations = (userId: string) => {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => getConversations(userId),
    enabled: !!userId,
  });
};
