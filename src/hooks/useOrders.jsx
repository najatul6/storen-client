import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: orders = [],isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/orders?email=${user?.email}`)
            return res.data;
        }
    })
    return [orders,refetch,isLoading]
};

export default useOrders;