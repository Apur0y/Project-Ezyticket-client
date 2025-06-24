import { useContext } from "react"
import { TravelContext } from "../../Provider/TravelProvider"

const useTravelContext = () => {
    const travelData = useContext(TravelContext)
    return travelData
}

export default useTravelContext