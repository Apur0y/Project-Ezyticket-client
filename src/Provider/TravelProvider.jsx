import { createContext, useState } from 'react'
import useBusStandName from '../Pages/Travel/TravelHooks/useBusStandName';
import useBusState from '../Pages/Travel/TravelHooks/useBusState';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'

export const TravelContext = createContext()

const TravelProvider = ({children}) => {
    const [searchData, setSearchData] = useState();
    const [districts] = useBusStandName()
    const [allBusData] = useBusState()
    const [filterBus, setFilterBus] = useState()
    const [busPassengerData,setBusPassengerData] = useState()
    const axiosSecure = useAxiosSecure()

    const getBusPaymentData = (data, navigate)=>{
      axiosSecure.post("/payment-bus-ticket", data)
      .then(res => {
        if(res.data.result.insertedId){
          Swal.fire({
            title: "Payment Successful",
            icon: "success",
            draggable: true
          });
          navigate(`/travel-payment-success/${data.transactionId}`)
        }
      })
    }


    const travelData = {
        searchData,
        setSearchData,
        districts,
        allBusData,
        filterBus,
        setFilterBus,
        busPassengerData,
        setBusPassengerData,
        getBusPaymentData

    }
  return (<TravelContext.Provider value={travelData} >{children}</TravelContext.Provider>)
}

export default TravelProvider