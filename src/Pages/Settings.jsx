import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import SettingsComponent from "../Components/Settings/Settings";
import PrivacyPolicy from "../Components/Settings/Pages/PrivacyPolicy";
import TermCondition from "../Components/Settings/Pages/TermCondition";
import FAQ from "../Components/Settings/Pages/FAQ";

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
  } else {
    setPage("settings");
  }
}, [location.pathname]);

  return (
    <div className="pb-2">

      {page === "settings" && <SettingsComponent />}

      {page === "privacy" && <PrivacyPolicy />}
       {page === "FAQ" && <FAQ />}

      {page === "TermCondition" && <TermCondition />}

      <Footer />
    </div>
  );
};

export default Settings;