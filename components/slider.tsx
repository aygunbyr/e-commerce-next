'use client';

import Image from 'next/image';
import { useWindowSize } from '@uidotdev/usehooks';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/styles/slider/index.css';

const Slide = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="relative h-72 md:h-80 xl:h-[600px]">
      <Image src={imageSrc} alt="Slide" fill className="object-cover" />
    </div>
  );
};

const Slider = () => {
  const { width } = useWindowSize();

  return (
    <Swiper
      className="mySwiper"
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      navigation={width ? width >= 768 : true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <Slide imageSrc="/assets/ian-dooley-TT-ROxWj9nA-unsplash.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide imageSrc="/assets/brooke-cagle-CYRlCwtduwE-unsplash.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide imageSrc="/assets/the-nix-company-4Hmj9gkyM6c-unsplash.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide imageSrc="/assets/pexels-karolina-grabowska-5632386.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide imageSrc="/assets/pexels-jess-bailey-designs-788946.jpg" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
