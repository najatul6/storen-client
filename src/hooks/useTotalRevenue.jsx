import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTotalRevenue = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/totalRevenue");
      return res.data; // Expected response: { pending: 1000, processing: 500, completed: 3000 }
    },
  });

  return {
    totalRevenue: data?.completed + data?.processing + data?.pending || 0,
    pendingRevenue: data?.pending || 0,
    processingRevenue: data?.processing || 0,
    completedRevenue: data?.completed || 0,
    isLoading,
  };
};

export default useTotalRevenue;
