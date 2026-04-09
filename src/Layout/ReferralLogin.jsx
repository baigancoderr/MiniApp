import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ReferralLogin = () => {
  const [referral, setReferral] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!referral.trim()) {
        toast.error("Enter referral code ❌");
        return;
      }

      const tg = window.Telegram?.WebApp;

      if (!tg) {
        toast.error("Open inside Telegram ❌");
        return;
      }

      const user = tg.initDataUnsafe?.user;

      if (!user) {
        toast.error("Telegram user not found ❌");
        return;
      }

      tg.ready();

      // 🔥 API CALL (Create user with referral)
      const res = await api.post("/user/telegram-login", {
        telegramId: user.id,
        name: `${user.first_name} ${user.last_name || ""}`,
        username: user.username || "",
        referralCode: referral, // 👈 USER INPUT
      });

      const data = res.data;

      if (data.success) {
        // ✅ Save
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("referral", referral);

        toast.success("Account Created 🚀");

        navigate("/"); // 👉 Home
      } else {
        toast.error(data.message || "Invalid referral ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-[#444385] overflow-hidden">
        <div className="bg-[#00000033] p-6 backdrop-blur-[20px]">

          <h2 className="text-lg text-center mb-4">
            Enter Referral Code
          </h2>

          <input
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            placeholder="Enter referral..."
            className="w-full bg-black border border-[#81ECFF] rounded-lg px-4 py-3 mb-4"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#587FFF] to-[#09239F] py-3 rounded-full"
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  );
};

export default ReferralLogin;