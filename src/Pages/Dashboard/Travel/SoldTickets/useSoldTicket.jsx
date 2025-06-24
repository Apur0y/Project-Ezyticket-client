import {useQuery} from '@tanstack/react-query'
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';


const useSoldTicket = () => {
    const axiosPublic = useAxiosPublic()
    const { data: soldTickets = [], refetch } = useQuery({
        queryKey: ['soldTickets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/sold-ticket');
            return res.data;
        }
    })

    return [soldTickets, refetch]
}

export default useSoldTicket
