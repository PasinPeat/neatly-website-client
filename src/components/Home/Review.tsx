import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../App.css";

import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";

function Reviews() {
  return (
    <div className=" bg-green-200 pb-[150px] pt-20 relative">
      <div className="mb-6 font-noto-serif-display text-green-800 text-headline2 text-center absolute left-0 right-0 z-40">
        Our Customer Says
      </div>

      <Swiper
        className=" bg-green-200 w-[950px]"
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        id="swiper-color2"
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Autoplay, Pagination, Navigation]}
      >
        <div
          slot="container-start"
          // className="parallax-bg"
          className=" bg-white"
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
<<<<<<< Updated upstream
          <div className=" py-28 flex flex-col items-center justify-center bg-green-200">
=======
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
>>>>>>> Stashed changes
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                est sit aliqua dolor do amet sint, velit official consequat duis
                enim velit mollit, exercitation minim amet consequat sunt.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
              />
              <span className="text-gray-600">Katherine, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                est sit aliqua dolor do amet sint, velit official consequat duis
                enim velit mollit, exercitation minim amet consequat sunt.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
              />
              <span className="text-gray-600">Katherine, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                est sit aliqua dolor do amet sint, velit official consequat duis
                enim velit mollit, exercitation minim amet consequat sunt.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
              />
              <span className="text-gray-600">Katherine, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                est sit aliqua dolor do amet sint, velit official consequat duis
                enim velit mollit, exercitation minim amet consequat sunt.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
              />
              <span className="text-gray-600">Katherine, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “lorem ipsum dolor sit amet minim mollit non deserunt ullamco
                est sit aliqua dolor do amet sint, velit official consequat duis
                enim velit mollit, exercitation minim amet consequat sunt.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
              />
              <span className="text-gray-600">Katherine, Company®</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Reviews;
