import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

export default function MovieSlider() {
  return (
    <div className="w-full">
      <Swiper
        centeredSlides={true}
        slidesPerView={'auto'}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="!w-[60%]">Ssdqrwrweq1</SwiperSlide>
        <SwiperSlide className="!w-[80%]">OJognlk the best 3</SwiperSlide>
        <SwiperSlide className="!w-[40%]"><div className="bg-gray-300 h-64 flex items-center justify-center text-2xl">Slide 3</div></SwiperSlide>
        <SwiperSlide className="!w-[40%]"><div className="bg-gray-300 h-64 flex items-center justify-center text-2xl">Slide 4</div></SwiperSlide>
        <SwiperSlide className="!w-[40%]"><div className="bg-gray-300 h-64 flex items-center justify-center text-2xl">Slide 5</div></SwiperSlide>
      </Swiper>

      <MovieSlider></MovieSlider>
    </div>
  );
}
