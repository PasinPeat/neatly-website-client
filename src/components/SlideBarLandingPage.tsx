import React from "react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../App.css"

function SlideBarLandingPage() {
  return (
    <Swiper
      className=" bg-white"
      id="swiper-color"
      modules={[Navigation, Autoplay, A11y]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={150}
      slidesPerView={4}
    //   slidesOffsetBefore={50}
    //   slidesOffsetAfter={40}
      centeredSlides={true}
      centeredSlidesBounds={true}
      navigation 
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/supreme?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwcmVtZSIsImlhdCI6MTY5Mzg4NzAzNywiZXhwIjoxNzI1NDIzMDM3fQ.YP47DbhLIhV__wFiH55i4kYeFweNL95nVQd6mIBa8Cw&t=2023-09-05T04%3A10%3A36.221Z"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM4ODcxMjcsImV4cCI6MTcyNTQyMzEyN30.c-xMGaQ2PPAlmBW4bHXW2FBSC6yx18Hq7CAdz22cSJc&t=2023-09-05T04%3A12%3A06.373Z"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-1?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTEiLCJpYXQiOjE2OTM4ODcxNTUsImV4cCI6MTcyNTQyMzE1NX0.YpVk-Ak4QsFsKlTFMB1qFA3vvPVsW5km32ePy2pQwag&t=2023-09-05T04%3A12%3A34.182Z"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3IiLCJpYXQiOjE2OTM4ODcxODIsImV4cCI6MTcyNTQyMzE4Mn0.e810cAzSHexnS6z71g0szefewy8okk-rcAw8rIIcilA&t=2023-09-05T04%3A13%3A01.154Z"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/suite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VpdGUiLCJpYXQiOjE2OTM4ODcyMDgsImV4cCI6MTcyNTQyMzIwOH0.D5rEvtCycFlGLNYDtZcxqWVDfql17Rz89o-wESUkqqc&t=2023-09-05T04%3A13%3A26.938Z"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/premium?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvcHJlbWl1bSIsImlhdCI6MTY5Mzg4NzI0NywiZXhwIjoxNzI1NDIzMjQ3fQ.2ZS_KmHgKl6ktV3tAUJdgSvFwWevYQwccJaFD9iofnQ&t=2023-09-05T04%3A14%3A06.486Z"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[400px] h-[500px] ml-4">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-garden-3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ2FyZGVuLTMiLCJpYXQiOjE2OTM4ODcyODQsImV4cCI6MTcyNTQyMzI4NH0.xuJpO46fJEW71Biyxhed_tgar-G4PPUR_AVgpWJUVSo&t=2023-09-05T04%3A14%3A43.534Z"
          />
        </div>
      </SwiperSlide>
      {/* <SwiperSlide>
        <div className="w-[400px] h-[500px] ">
          <img
            className="w-full h-full object-cover"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/cover.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvY292ZXIuanBnIiwiaWF0IjoxNjkzODg2Njk1LCJleHAiOjE3MjU0MjI2OTV9.mM7FxdsaFMFHpnIl0MHmC3X_4C_xvsc-Pv8AryUYr30&t=2023-09-05T04%3A04%3A53.695Z"
          />
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
}

export default SlideBarLandingPage;
