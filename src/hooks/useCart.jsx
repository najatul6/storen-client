import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCarts = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: cart = [],isLoading } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data;
        }
    })
    return [cart,refetch,isLoading]
};

export default useCarts;