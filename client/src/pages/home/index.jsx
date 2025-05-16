import OurService from "@components/home/ourService";
import OurAdvantage from "@components/home/ourAdvantage";
import TestimonialsSection from "@components/home/testimonial";
import Banner from "@components/home/banner";
import LocationMap from "@components/home/locationMap";

const Home = () => {
  return (
    <>
      <Banner />
      <OurService />
      <OurAdvantage />
      <TestimonialsSection />
      <LocationMap />
    </>
  );
};

export default Home;
