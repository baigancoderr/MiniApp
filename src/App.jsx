import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Wallet from "./Pages/Wallet";
import Upgrade from "./Pages/Upgrade";
import Settings from "./Pages/Settings";
import MagicRings from "./Layout/MagicRings";
import AddFund from "./Pages/AddFund";

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 bg-black/90 -z-[5]">
        <MagicRings
          color="#fc42ff"
          colorTwo="#42fcff"
          ringCount={6}
          speed={0.8}
          opacity={0.8}
          followMouse={true}
          clickBurst={true}
        />
      </div>

      <div className="fixed inset-0 bg-black/90 -z-10"></div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/addfund" element={<AddFund />} />

          {/* 🔥 SETTINGS ROUTES */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<Settings />} />
          <Route path="/settings/referral" element={<Settings />} />
          <Route path="/settings/referral-earning-history" element={<Settings />} />
          <Route path="/settings/wallet-breakdown" element={<Settings />} />
          <Route path="/settings/deposit-history" element={<Settings />} />
          <Route path="/settings/withdraw-usdt" element={<Settings />} />
          <Route path="/settings/faqs" element={<Settings />} />
          <Route path="/settings/privacy" element={<Settings />} />
          <Route path="/settings/term-condition" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;