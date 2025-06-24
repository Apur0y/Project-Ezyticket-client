import { useDispatch, useSelector } from "react-redux";
import travelBannerImage from "../../../assets/Travel_image/travel-service/bg-bus.jpg"
import useTravelContext from "../../../Hooks/TrevalHook/useTravelContext"
import useAuth from "../../../Hooks/useAuth";
import BusCard from "../TravelComponents/BusCard"
import BusFilter from "./BusFilter";
import SelectPlaceTime from "./SelectPlaceTime"
import { useEffect } from "react";
import { fetchBus } from "../../../features/allBus/allBusSlice";
const TravelBusTicketPage = () => {


  const { allBus } = useSelector(state => state.allBus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBus())
  }, [dispatch])


  const { allBusData, filterBus, } = useTravelContext()
  const { darkMode } = useAuth()

  return (
    <div className="my-20">
      <div
        className="relative hero min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${travelBannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="text-center relative z-10 px-5">
          <SelectPlaceTime />
        </div>
      </div>

      {/* select bus */}
      <section className="grid grid-cols-12 my-14 container mx-auto px-5">
        <div className=" col-span-0 lg:col-span-3 hidden lg:flex">

          <BusFilter />
        </div>

        {/* bus card */}

        <div className="col-span-12 lg:col-span-9 flex flex-col gap-10 ">
          {
            !filterBus ?
              allBus.map((bus, idx) => <BusCard key={idx} bus={bus} />)
              :
              filterBus.map((bus, idx) => <BusCard key={idx} bus={bus} />)
          }
        </div>
      </section>


    </div>
  );
};

export default TravelBusTicketPage;
