import Heading from "../../../components/Heading"
import useTravelData from "../../../Hooks/TrevalHook/useTravelData"
import TravelServiceCard from "./TravelServiceCard"

const TravelService = () => {


  // const busServices = [
  //   {
  //     title: "Corporate Shuttle Service",
  //     image: BusImage1,
  //   },
  //   {
  //     title: "Airport Transfer Service",
  //     image: BusImage2,
  //   },
  //   {
  //     title: "City & Intercity Bus Service",
  //     image: BusImage3,
  //   },
  //   {
  //     title: "Event Transportation",
  //     image: BusImage4,
  //   },
  //   {
  //     title: "School & College Bus Service",
  //     image: BusImage5,
  //     path: "//travelbus-reservation"
  //   },
  //   {
  //     title: "Tour & Travel Bus Rentals",
  //     image: BusImage6,
  //   },
  // ];
  const {busServices} = useTravelData()

  return (
    <section className="container mx-auto px-5">
      <Heading
        title="Reliable Bus Rental & Shuttle Services"
        subtitle="Ezy Ticket offers efficient and comfortable bus and shuttle services for all your travel needs. Whether you're planning a group trip, airport transfer, or daily commute, we ensure a smooth and reliable experience."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {
          busServices.map((service, idx) => <TravelServiceCard key={idx} service={service} />)
        }
      </div>
    </section>
  )
}

export default TravelService