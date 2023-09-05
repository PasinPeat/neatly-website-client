import React from "react";
import SlideBarLandingPage from "../SlideBarLandingPage";
function About() {
  return (
    <div className=" bg-white">
      <div className="pt-36 px-40">
        <div className="mb-12 text-headline2 font-noto-serif-display">
          Neatly Hotel
        </div>
        <div className="ml-36 text-body1 flex flex-col justify-end ">
          <span>
            Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
            with an outdoor pool, kids' club, sports facilities and a fitness
            centre. There is also a spa, an indoor pool and saunas.
          </span>
          <br></br>
          <span>
            All units at the hotel are equipped with a seating area, a
            flat-screen TV with satellite channels, a dining area and a private
            bathroom with free toiletries, a bathtub and a hairdryer. Every room
            in Neatly Hotel features a furnished balcony. Some rooms are
            equipped with a coffee machine.
          </span>
          <br></br>
          <span>
            Free WiFi and entertainment facilities are available at property and
            also rentals are provided to explore the area.
          </span>
        </div>
      </div>
      {/* image slide */}
      <div className="pt-36 pb-20">
        <div className="h-[500px] bg-gray-300">
          <SlideBarLandingPage/>
        </div>
      </div>
    </div>
  );
}

export default About;
