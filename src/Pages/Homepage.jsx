import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import bgImg from "../assets/bgImg.png";

const Homepage = () => {
  return (
    <div className="pb-24" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Page Content */}
      

      {/* Footer */}
      <Hero/>
      <Footer />
    </div>
  );
};

export default Homepage;