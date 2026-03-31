import Footer from "../Components/Footer";
import AddFundHero from "../Components/AddFund/AddFundHero";
import bgImg from "../assets/bgImg.png";

const Homepage = () => {
  return (
    <div className="pb-20" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Page Content */}
      

      {/* Footer */}
     <AddFundHero/>
      <Footer />
    </div>
  );
};

export default Homepage;