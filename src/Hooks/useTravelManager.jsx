import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useTravelManager = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: isTravelManager, isPending: isTravelManagerLoading } = useQuery({
        queryKey: [user?.email, 'isTravelManager'],
        enabled: !loading, 
        queryFn: async () => {
            // console.log('asking or checking isTravelManager', user)
            const res = await axiosSecure.get(`/users/travelManager/${user?.email}`);
            console.log(res.data);
            return res.data?.travelManager;
        }
    })
    return [isTravelManager, isTravelManagerLoading]
};


export default useTravelManager;