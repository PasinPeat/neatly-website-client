import React from "react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import { RoomsContext } from "../../App.tsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../App.css";
import "../../App.css";

function SlideBarLandingPage() {
  const context = useContext(RoomsContext);
  // console.log(context.rooms);

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
      breakpoints={{
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 30,
        },
        "@0.75": {
          slidesPerView: 1,
          spaceBetween: 400,
          slidesOffsetBefore: 70,
          slidesOffsetAfter: 40,
        },
        "@1.00": {
          slidesPerView: 2,
          spaceBetween: 50,
          slidesOffsetBefore: -82,
          // slidesOffsetAfter:80,
        },
        "@1.50": {
          slidesPerView: 4,
          spaceBetween: 150,
        },
      }}
      slidesOffsetBefore={-85}
      //   slidesOffsetBefore={50}
      //   slidesOffsetBefore={50}
      //   slidesOffsetAfter={40}
      centeredSlides={true}
      centeredSlidesBounds={true}
      navigation
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
    >
      {context.rooms.map((room, index) => {
        console.log(room.room_images[0]);
        return (
          <div>
            <SwiperSlide>
              <div className="w-[400px] h-[500px] ml-4">
                <img
                  className="w-full h-full object-cover"
                  src={room.room_images[0]}
                />
              </div>
            </SwiperSlide>
          </div>
        );
      })}
    </Swiper>
  );
}

export default SlideBarLandingPage;
