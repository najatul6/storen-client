import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = () => {
    const axiosSecure=useAxiosSecure();
    const {data: allUser,isLoading,refetch  } = useQuery({
      queryKey: ["allUser"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/allUsers`);
        return res.data;
      },
    });
    return [allUser,isLoading,refetch];
}

export default useAllUser