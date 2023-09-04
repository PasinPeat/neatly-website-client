import React from "react";
import Header from "../components/Home/Header.tsx";
import About from "../components/Home/About.tsx";
import Service from "../components/Home/Service.tsx";
import Rooms from "../components/Home/Rooms.tsx";
import Review from "../components/Home/Review.tsx";
import Footer from "../components/Home/Footer.tsx";

function Home() {
  return (
    <div>
      <Header />
      <About />
      <Service />
      <Rooms />
      <Review />
      <Footer />
    </div>
  );
}

export default Home;
