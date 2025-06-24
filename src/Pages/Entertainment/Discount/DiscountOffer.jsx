import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const DiscountOffer = () => {
    return (
        <div
        style={{
            backgroundImage: "url('/offer.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        className='my-10 relative text-white h-80'
     
        >
            <img src="/offer.jpg" alt="" className='hidden md:flex' />

            <div
         
            className='absolute top-25 left-7 md:left-20'>
                <h2 className='text-2xl mb-3'>YOUR FAVOURITE CINEMA <br /> JUST GOT HERE</h2>
                <p>Book Ticket, get point, enjoy discount</p>
                <h2 className='flex text-green-500 text-xl mt-3 '>Get Your Ticket Now <IoIosArrowForward className='my-auto' />
                </h2>

            </div>
        </div>
    );
};

export default DiscountOffer;