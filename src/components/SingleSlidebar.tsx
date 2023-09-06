import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../App.css";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import "@splidejs/react-splide/css";

function SingleSlidebar() {
  return (
    
      <Swiper
        className=" bg-white w-[640px] h-[400px] rounded-md"
        id="swiper-single"
        modules={[Parallax, Autoplay, Pagination, Navigation]}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        speed={400}
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        // slidesOffsetBefore={-200}
        //   slidesOffsetAfter={40}
        centeredSlides={true}
        centeredSlidesBounds={true}
        navigation={true}
      >
        <SwiperSlide>
          <div className="w-full h-full ">
            <img
              className="w-full h-full object-cover rounded-md"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/supreme?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwcmVtZSIsImlhdCI6MTY5Mzg4NzAzNywiZXhwIjoxNzI1NDIzMDM3fQ.YP47DbhLIhV__wFiH55i4kYeFweNL95nVQd6mIBa8Cw&t=2023-09-05T04%3A10%3A36.221Z"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM4ODcxMjcsImV4cCI6MTcyNTQyMzEyN30.c-xMGaQ2PPAlmBW4bHXW2FBSC6yx18Hq7CAdz22cSJc&t=2023-09-05T04%3A12%3A06.373Z"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-1?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTEiLCJpYXQiOjE2OTM4ODcxNTUsImV4cCI6MTcyNTQyMzE1NX0.YpVk-Ak4QsFsKlTFMB1qFA3vvPVsW5km32ePy2pQwag&t=2023-09-05T04%3A12%3A34.182Z"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/suite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VpdGUiLCJpYXQiOjE2OTM4ODcyMDgsImV4cCI6MTcyNTQyMzIwOH0.D5rEvtCycFlGLNYDtZcxqWVDfql17Rz89o-wESUkqqc&t=2023-09-05T04%3A13%3A26.938Z"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/premium?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvcHJlbWl1bSIsImlhdCI6MTY5Mzg4NzI0NywiZXhwIjoxNzI1NDIzMjQ3fQ.2ZS_KmHgKl6ktV3tAUJdgSvFwWevYQwccJaFD9iofnQ&t=2023-09-05T04%3A14%3A06.486Z"
            />
          </div>
        </SwiperSlide>
        
        
      </Swiper>
    
  );
}

export default SingleSlidebar;
