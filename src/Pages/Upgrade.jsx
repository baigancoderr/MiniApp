// Pages/Upgrade.jsx
import UpgradeHero from "../Components/Upgrade/UpgradeHero";
import Footer from "../Components/Footer";
import bgImg from "../assets/bgImg.png";

const Upgrade = () => {
  return (
    <div className="min-h-screen pb-24" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <UpgradeHero />
      <Footer />
    </div>
  );
};

export default Upgrade;