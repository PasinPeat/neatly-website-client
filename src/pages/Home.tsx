import React from "react";
import Header from "../components/Header.tsx";
import About from "../components/About.tsx";
import Service from "../components/Service.tsx";
import Rooms from "../components/Rooms.tsx";
import Review from "../components/Review.tsx";
import Footer from "../components/Footer.tsx";

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
