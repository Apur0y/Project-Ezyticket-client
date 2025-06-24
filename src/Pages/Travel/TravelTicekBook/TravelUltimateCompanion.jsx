
import Heading from '../../../components/Heading';
import useTravelContext from '../../../Hooks/TrevalHook/useTravelContext';
// import BusCard from '../TravelComponents/BusCard';
import SelectPlaceTime from './SelectPlaceTime';

const TravelUltimateCompanion = () => {

  // TODO: all bus data will todays bus data. fetch data, and api 4 deferent bus info
  const { allBusData } = useTravelContext()
  return (
    <section className='container mx-auto my-20 px-5'>
      <div className={`my-10`}>
        <Heading
          title="Your Ultimate Travel Companion"
          subtitle="Discover and book your next adventure effortlessly with ExploreEase! From flights to hotels and exciting experiences, we make travel planning simple, fast, and convenient. Start exploring today!"
        ></Heading>
        <div className={`my-10`}>
          <SelectPlaceTime />
        </div>
      </div>
      {/* <div className="col-span-9 px-4 flex flex-col gap-10 ">
        {
          allBusData.slice(0, 4).map((bus, idx) => <BusCard key={idx} bus={bus} />)
        }
      </div> */}
    </section>
  )
}

export default TravelUltimateCompanion;