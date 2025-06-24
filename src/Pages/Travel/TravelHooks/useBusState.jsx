import {useQuery} from '@tanstack/react-query'
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const useBusState = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allBusData = [], refetch } = useQuery({
        queryKey: ['allBusData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/bus');
            return res.data;
        }
    })

    return [allBusData, refetch]
}

export default useBusState

