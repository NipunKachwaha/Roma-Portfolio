'use client';

import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Footer from "./components/footer";
import Hero from "./components/hero";
import SectionSlider from "./components/common/SectionSlider";

const Home = () => {
  return (
    <CanvasLoader>
      <ScrollWrapper>
        <Hero/>
        <SectionSlider/>
        <Footer/>
      </ScrollWrapper>
    </CanvasLoader>
  );
};
export default Home;
