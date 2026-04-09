import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "../Pages/Homepage";
import Wallet from "../Pages/Wallet";
import Upgrade from "../Pages/Upgrade";
import Settings from "../Pages/Settings";
import AddFund from "../Pages/AddFund";
import PaymentScreen from "../Components/AddFund/PaymentScreen";
import ReferralTeamTree from "../Components/Settings/Pages/ReferralTeamTree";
import ReferralLogin from "./ReferralLogin";

import Loader from "../Context/Loader";

function AppWrapper() {
    const ALLOW_BROWSER = true;
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // ✅ smooth route transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

useEffect(() => {
  const token = localStorage.getItem("token");

  // ❌ Not logged in → login page
  if (!token && location.pathname !== "/login") {
    window.location.replace("/login");
  }

  // ✅ Already logged → home
  if (token && location.pathname === "/login") {
    window.location.replace("/");
  }
}, [location.pathname]);


if (!window.Telegram || !window.Telegram.WebApp) {
  return null;
}


if (!ALLOW_BROWSER) {
  if (!window.Telegram?.WebApp?.initData) {
    return null;
  }
}

  return (
    <>
      {/* 🔥 ROUTE LOADER */}
      {/* {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[9999] backdrop-blur-sm">
          <Loader />
        </div>
      )} */}

      {/* 🔥 ROUTES */}
      <Routes>
        <Route path="/login" element={<ReferralLogin />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/invest" element={<Upgrade />} />
        <Route path="/addfund" element={<AddFund />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/referral-team-tree" element={<ReferralTeamTree />} />

        {/* SETTINGS ROUTES */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Settings />} />
        <Route path="/settings/referral" element={<Settings />} />
        <Route path="/settings/referral-earning-history" element={<Settings />} />
        <Route path="/settings/investment-history" element={<Settings />} />
        <Route path="/settings/deposit-history" element={<Settings />} />
        <Route path="/settings/withdraw-usdt" element={<Settings />} />
        <Route path="/settings/faqs" element={<Settings />} />
        <Route path="/settings/privacy" element={<Settings />} />
        <Route path="/settings/term-condition" element={<Settings />} />
        
      </Routes>
    </>
  );
}

export default AppWrapper;