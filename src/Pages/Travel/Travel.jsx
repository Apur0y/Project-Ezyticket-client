import React from 'react'
import TravelBanner from './TravelComponents/TravelBanner'
import TravelService from './TravelServiceSeciton/TravelService'
import AddTravelService from './AddTravelService/AddTravelService'
import FlashDeals from './FlashDeals/FlashDeals'
import useAuth from '../../Hooks/useAuth'
import TravelFAQ from './TravelFAQ/TravelFAQ'
import WhyChooseUsTravel from './TravelComponents/WhyChooseUsTravel'
import TravelTestimonials from './TravelComponents/TravelTestimonials'
import BusCompaniesSection from './BusCompaniesSection/BusCompaniesSection'
import PopularBusRoutes from './BusCompaniesSection/PopularBusRoutes'
const Travel = () => {
  const { darkMode } = useAuth()
  return (
    <section
      className={`${darkMode ? "bg-[#111111] " : ""} overflow-x-hidden`}
    >
      <TravelBanner />

      <section className='container mx-auto px-4 pt-10 mb-14'>
        <FlashDeals />
      </section>
      {/*      
      <div className='px-4 mb-20'>
        <TravelService />
      </div> */}

      <AddTravelService />
      <BusCompaniesSection></BusCompaniesSection>

      {/* set form */}
      <div id="scroll-section ">
        {/* <TravelUltimateCompanion/> */}
      </div>
      <section className='px-4 mb-20'>
        <TravelFAQ />
        {/* TODO: need added premium section */}
        <WhyChooseUsTravel />
      </section>
      {/*<TravelTestimonials/> */}
      <PopularBusRoutes/>

    </section>
  )
}

export default Travel;