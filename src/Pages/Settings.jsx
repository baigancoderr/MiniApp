import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import SettingsComponent from "../Components/Settings/Settings";
import PrivacyPolicy from "../Components/Settings/Pages/PrivacyPolicy";
import TermCondition from "../Components/Settings/Pages/TermCondition";
import WalletBreakdown from "../Components/Settings/Pages/WalletBreakdown";
import Referral from "../Components/Settings/Pages/Referral";
import FAQ from "../Components/Settings/Pages/FAQ";
import Profile from "../Components/Settings/Pages/Profile";
import bgImg from "../assets/bgImg.png";

const Settings = () => {
  const location = useLocation();
  const [page, setPage] = useState("settings");

  // 🔥 URL sync
useEffect(() => {
  if (location.pathname.includes("privacy")) {
    setPage("privacy");
  } else if (location.pathname.includes("TermCondition")) {
    setPage("TermCondition");
  } else if (location.pathname.includes("FAQ")) {
    setPage("FAQ");
  } 
   else if (location.pathname.includes("FAQ")) {
    setPage("FAQ");
  }else if (location.pathname.includes("WalletBreakdown")) {
    setPage("WalletBreakdown");
  }
  else if (location.pathname.includes("Referral")) {
    setPage("Referral");
  }
   else if (location.pathname.includes("Profile")) {
    setPage("Profile");
  }
  else {
    setPage("settings");
  }
}, [location.pathname]);

  return (
    <div className="pb-2" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>

      {page === "settings" && <SettingsComponent />}

      {page === "privacy" && <PrivacyPolicy />}
       {page === "FAQ" && <FAQ />}

      {page === "TermCondition" && <TermCondition />}

      {page === "WalletBreakdown" && <WalletBreakdown />}
      {page === "Referral" && <Referral />}
      {page === "Profile" && <Profile />}


      <Footer />
    </div>
  );
};

export default Settings;