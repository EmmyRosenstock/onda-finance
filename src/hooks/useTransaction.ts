import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

type ApiPost = {
  id: number;
  title: string;
};

export function useTransactions() {
  return useQuery({
    queryKey: ["mock-transactions"],
    queryFn: async () => {
      const { data } = await api.get<ApiPost[]>("/posts");
      return data.slice(0, 5);
    },
  });
}