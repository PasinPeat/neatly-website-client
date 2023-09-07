import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../App.css";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";

function RoomDetailSlidebar({ roomImages }) {
  return (
    <div className="pt-20 bg-gray-200">
      <Swiper
        className="bg-gray-200"
        id="swiper-color"
        modules={[Parallax, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={400}
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={400}
        slidesPerView={2}
        pagination={{
          clickable: true,
        }}
        slidesOffsetBefore={-200}
        //   slidesOffsetAfter={40}
        centeredSlides={true}
        centeredSlidesBounds={true}
        navigation={true}
      >
        {roomImages.map((image, index) => {
          return (
            <div key={index}>
              <SwiperSlide>
                <div className="w-[930px] h-[580px] ml-4">
                  <img className="w-full h-full object-cover" src={image} />
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
}

export default RoomDetailSlidebar;
