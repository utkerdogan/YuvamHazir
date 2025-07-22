import React from "react";
import HeroSection from "../components/HeroSection";
import HomeCarousel from "../components/HomeCarousel";
import TeamCard from "../components/TeamCard";
import TopRatedProducts from "../components/TopRatedProducts";

const Home = () => {

  return (
        <div>
          <HeroSection />
          <HomeCarousel />
          <TopRatedProducts />
          <TeamCard />
        </div>
  );
};

export default Home;