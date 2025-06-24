import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useEventManager = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: isEventManager, isPending: isEventManagerLoading } = useQuery({
        queryKey: [user?.email, 'isEventManager'],
        enabled: !loading, 
        queryFn: async () => {
            // console.log('asking or checking isEventManager', user)
            const res = await axiosSecure.get(`/users/eventManager/${user?.email}`);
            console.log(res.data);
            return res.data?.eventManager;
        }
    })
    return [isEventManager, isEventManagerLoading]
};


export default useEventManager;