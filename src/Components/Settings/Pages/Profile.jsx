import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, User, Copy, Share2 } from "lucide-react";
import userimg2 from "../../../assets/setting/user-img.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";


const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tgUser, setTgUser] = useState(null);
  const [apiUser, setApiUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);



  const [walletAddress, setWalletAddress] = useState("");
const [isSaved, setIsSaved] = useState(false);
const [isEditing, setIsEditing] = useState(true);



const handleSave = async () => {
  if (!walletAddress.trim()) {
    toast.error("Enter wallet address ❌");
    return;
  }

  if (saving) return; 

  try {
    setSaving(true);

    const token = localStorage.getItem("token");

    let res;

    if (!apiUser || !apiUser.walletAddress) {
      res = await api.post(
        "/user/add-wallet",
        { walletAddress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      res = await api.put(
        "/user/update-wallet",
        { walletAddress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    if (res.data.success) {
      const updatedUser = res.data.user;

      setApiUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      queryClient.setQueryData(["me"], updatedUser);

      setIsSaved(true);
      setIsEditing(false);

      toast.success(res.data.message || "Success ✅");
    } else {
      toast.error(res.data.message || "Failed ❌");
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "API Error ❌");
  } finally {
    setSaving(false);
  }
};



const handleUpdate = () => {
  setIsEditing(true);
};


useEffect(() => {
  if (apiUser?.walletAddress) {
    setWalletAddress(apiUser.walletAddress);
    setIsSaved(true);
    setIsEditing(false);
  }
}, [apiUser]);

  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [inputReferral, setInputReferral] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const {
    data: meUser,
    isLoading: meLoading,
    isError: meError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/me");

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch user data");
      }

      return res.data.user;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (meUser) {
      setApiUser(meUser);
      localStorage.setItem("user", JSON.stringify(meUser));
    }
  }, [meUser]);


  // ✅ Telegram + API Integration

useEffect(() => {
  const initTelegram = async () => {
    try {
      const tg = window.Telegram?.WebApp;

      if (!tg) {
        console.log("Not inside Telegram");
        setLoading(false);
        return;
      }

      tg.ready();

      const user = tg.initDataUnsafe?.user;

      if (!user) {
        console.log("No Telegram user found");
        setLoading(false);
        return;
      }

      setTgUser(user);

      // ✅ Referral detect (ONLY from TG or URL)
      const urlParams = new URLSearchParams(window.location.search);
      const refFromUrl = urlParams.get("ref");
      const refFromTG = tg.initDataUnsafe?.start_param;

      const referralCode = refFromTG || refFromUrl || "";

      // 🔥 ALWAYS call API first
      const res = await api.post("/user/telegram-login", {
        telegramId: user.id,
        name: `${user.first_name} ${user.last_name || ""}`,
        username: user.username || "",
        referralCode: referralCode, // empty bhi chalega
      });

      const data = res.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId || data.user._id);

        setToken(data.token);
        queryClient.invalidateQueries(["me"]);

        if (referralCode) {
          localStorage.setItem("referral", referralCode);
        }

        setShowReferralPopup(false);
      } 
      // 🔥 UPDATED LOGIC
      else if (data.isNewUser || data.message?.toLowerCase().includes("referral")) {
        setShowReferralPopup(true);
      } 
      else {
        toast.error(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Telegram Login Error:", error);

      // ❌ API fail → popup mat dikha blindly
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  initTelegram();
}, []);

useEffect(() => {
  document.body.style.overflow = showReferralPopup ? "hidden" : "auto";
}, [showReferralPopup]);

const handleReferralSubmit = async () => {
  // 🔥 Start loading
  setLoading(true);

  // ✅ Validation
  if (!/^CPR[A-Z0-9]{6}$/.test(inputReferral)) {
    toast.error("Invalid Referral Code ❌");
    setLoading(false);
    return;
  }

  try {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (!user) {
      toast.error("Telegram user not found ❌");
      setLoading(false);
      return;
    }

    // ✅ API Call
    const res = await api.post("/user/telegram-login", {
      telegramId: user.id,
      name: `${user.first_name} ${user.last_name || ""}`,
      username: user.username || "",
      referralCode: inputReferral,
    });

    const data = res.data;

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("referral", inputReferral);
      localStorage.setItem("userId", data.user.userId || data.user._id);

      setToken(data.token);
      queryClient.invalidateQueries(["me"]);

      setShowReferralPopup(false);

      toast.success("Login Success ✅");
    } else {
      toast.error(data.message || "Login failed ❌");
    }

  } catch (err) {
    console.error("Referral Submit Error:", err);
    toast.error("Something went wrong ❌");
  } finally {
    // 🔥 Stop loading (VERY IMPORTANT)
    setLoading(false);
  }
};

  // ✅ Referral Dynamic 
const referralLink = `https://t.me/cipera_bot?startapp=${apiUser?.referralCode || "loadingg" }`;

  // ✅ Share
  const handleShare = () => {
    const text = "Join and earn 🚀";
    const url = referralLink;

    if (window.Telegram?.WebApp) {
      const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`;

      window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
    } else if (navigator.share) {
      navigator.share({
        title: "Join Now 🚀",
        text,
        url,
      });
    } else {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`,
        "_blank"
      );
    }
  };

  // ✅ Copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Copied 🚀");
    } catch {
      toast.error("Copy failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center pb-24 px-2 py-3 text-white ">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">User Account</h2>
          </div>

          <div
            onClick={() => navigate("/settings")}
            className="w-10 h-10 flex items-center justify-center rounded-xl 
              bg-gradient-to-r from-[#587FFF] to-[#09239F] 
              shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition"
          >
            <User size={18} />
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="relative rounded-2xl border border-[#81ECFF99] p-[1px] mb-5 bg-gradient-to-br from-blue-500/20 to-black/30">
          <div className="rounded-2xl p-4 bg-[#0B0F19]">

            <div className="flex items-center gap-4 mb-4">
              <img
                src={tgUser?.photo_url || userimg2}
                className="w-20 h-20 rounded-full border border-white/20 object-cover"
              />

              <div>
                <h2 className="text-xl font-bold">
                  {tgUser
                    ? `${tgUser.first_name} ${tgUser.last_name || ""}`
                    : "Guest User"}
                </h2>
                <p className="text-xs text-gray-400">
                  {tgUser?.username ? `@${tgUser.username}` : ""}
                </p>
              </div>
            </div>

            {/* IDs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">USER ID</p>
                <p className="text-white">
                {loading || meLoading
  ? "Loading..."
  : apiUser?.userId || "N/A"}
                </p>
              </div>

              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">PARENT ID</p>
                <p className="text-white">
                {loading || meLoading
  ? "Loading..."
  : apiUser?.referredBy || "N/A"}
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* WALLET */}
        
    <div className="rounded-xl border border-[#444B55] p-4 bg-[#00000020] mb-5">
  <p className="text-sm text-gray-300 mb-2">Wallet Address</p>

  {/* Input */}
  <input
    type="text"
    value={walletAddress}
    disabled={!isEditing}
    onChange={(e) => setWalletAddress(e.target.value)}
    placeholder="Enter wallet address"
    className={`w-full px-3 py-2 rounded-lg text-sm bg-black border 
      ${isEditing ? "border-[#81ECFF]" : "border-[#444B55]"} 
      text-white mb-3`}
  />

  {/* Button */}
{isEditing ? (
  <button
    onClick={handleSave}
    className="w-full bg-gradient-to-r from-[#587FFF] to-[#09239F] py-2 rounded-lg text-sm"
  >
    {apiUser?.walletAddress ? "Update Wallet" : "Save Wallet"}
  </button>
) : (
  <button
    onClick={handleUpdate}
    className="w-full bg-green-500 py-2 rounded-lg text-sm"
  >
    Edit
  </button>
)}


</div>



        {/* REFERRAL */}
        <div className="rounded-xl border border-[#444B55] p-4 bg-[#00000020]">
          <p className="text-sm text-gray-300 mb-2">Referral Link</p>

          <div className="bg-black border border-[#81ECFF] rounded-lg p-2 text-xs mb-3 break-all">
            {referralLink}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 bg-gradient-to-r from-[#587FFF] to-[#09239F] py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Copy size={16} /> Copy
            </button>

            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-[#587FFF] to-[#09239F] py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

      </div>
      

      {showReferralPopup && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-[#0B0F19] border border-[#81ECFF] rounded-2xl p-5 w-[90%] max-w-sm text-center">

      <h2 className="text-lg font-semibold mb-2">Enter Referral Code</h2>

      {/* Telegram User Info */}
      <div className="flex flex-col items-center mb-3">
        <img
          src={tgUser?.photo_url || userimg2}
          className="w-16 h-16 rounded-full mb-2"
        />
        <p className="text-sm">
          {tgUser?.first_name} {tgUser?.last_name}
        </p>
        <p className="text-xs text-gray-400">@{tgUser?.username}</p>
      </div>

      {/* Input */}
      <input
        type="text"
        value={inputReferral}
        onChange={(e) => setInputReferral(e.target.value.toUpperCase())}
        placeholder="Enter CPRXXXXXX"
        className="w-full px-3 py-2 rounded-lg bg-black border border-[#444] text-white mb-3"
      />

      {/* Button */}
     <button
  onClick={handleReferralSubmit}
  disabled={loading}
  className={`w-full py-2 rounded-lg flex items-center justify-center gap-2
  bg-gradient-to-r from-[#587FFF] to-[#09239F]
  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {loading ? (
    <>
      {/* 🔄 Spinner */}
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Processing...
    </>
  ) : (
    "Continue"
  )}
</button>

    </div>
  </div>
)}


    </div>




  );
};

export default Profile;
