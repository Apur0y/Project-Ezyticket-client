import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useEntertainmentManager = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: isEntertainmentManager, isPending: isEntertainmentManagerLoading } = useQuery({
        queryKey: [user?.email, 'isEntertainmentManager'],
        enabled: !loading, 
        queryFn: async () => {
            // console.log('asking or checking isEntertainmentManager', user)
            const res = await axiosSecure.get(`/users/entertainmentManager/${user?.email}`);
            // console.log(res.data);
            return res.data?.entertainmentManager;
        }
    })
    return [isEntertainmentManager, isEntertainmentManagerLoading]
};


export default useEntertainmentManager;