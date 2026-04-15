import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Copy, Share2 } from "lucide-react";
import userimg2 from "../../../assets/setting/user-img.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import SkeletonPage from "../../../Layout/Skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ✅ fetchMe OUTSIDE
const fetchMe = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token");

  const res = await api.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.user;
};

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [refLoading, setRefLoading] = useState(false);
  // const [token, setToken] = useState(localStorage.getItem("token"));

  const [tgUser, setTgUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [inputReferral, setInputReferral] = useState("");

  // ✅ TanStack Query
const token = localStorage.getItem("token");

const {
  data: apiUser,
  isLoading,
  isError,
} = useQuery({
 queryKey: ["me", token],
  queryFn: fetchMe,
  enabled: !!token,
  retry: false,
});


  // ✅ Telegram Login
 const telegramLogin = async (tgUser, referralCode) => {
  try {
    const res = await api.post("/user/telegram-login", {
      telegramId: tgUser.id,
      name: `${tgUser.first_name} ${tgUser.last_name || ""}`,
      username: tgUser.username || "",
      referralCode,
    });

    // ✅ New user case (referral required)
    if (res.data.isNewUser) {
      setShowReferralPopup(true);
      return;
    }

    // ❌ backend error
    if (!res.data.success) {
      throw new Error(res.data.message || "Login failed");
    }

    // ✅ ALWAYS set token (important fix)
    const newToken = res.data.token;

    if (!newToken) {
      throw new Error("Token missing from server");
    }

    const oldToken = localStorage.getItem("token");

    // 🔥 overwrite always (prevents stale/corrupt token issues)
    if (oldToken !== newToken) {
      localStorage.setItem("token", newToken);
    }

    // 🔥 refresh /me query
    queryClient.invalidateQueries({ queryKey: ["me"] });

  } catch (err) {
    console.error("Telegram login error:", err);
    toast.error(err.message || "Login failed ❌");
  }
};

  // ✅ Init Telegram
useEffect(() => {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  if (!user) return;

  setTgUser(user);

  // 🔥 already token hai to login mat karo
  if (localStorage.getItem("token")) return;

  telegramLogin(user, "");
}, []);

  // ✅ Wallet sync
  useEffect(() => {
    if (apiUser?.walletAddress) {
      setWalletAddress(apiUser.walletAddress);
      setIsEditing(false);
    }
  }, [apiUser]);

  // ✅ Save Wallet
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

      if (!apiUser?.walletAddress) {
        res = await api.post(
          "/user/add-wallet",
          { walletAddress },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await api.put(
          "/user/update-wallet",
          { walletAddress },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (res.data.success) {
        toast.success("Wallet Saved ✅");

        // 🔥 Refresh user
      queryClient.invalidateQueries({ queryKey: ["me"] });
        setIsEditing(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  // ✅ Referral Submit
 const handleReferralSubmit = async () => {
  if (!/^CPR[A-Z0-9]{6}$/.test(inputReferral)) {
    toast.error("Invalid Referral Code ❌");
    return;
  }

  try {
    setRefLoading(true);

    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    const res = await api.post("/user/telegram-login", {
      telegramId: user.id,
      name: `${user.first_name} ${user.last_name || ""}`,
      username: user.username || "",
      referralCode: inputReferral,
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      

      queryClient.invalidateQueries({ queryKey: ["me"] });
      setShowReferralPopup(false);

      toast.success("Success ✅");
    } else {
      toast.error(res.data.message);
    }
  } catch {
    toast.error("Error ❌");
  } finally {
    setRefLoading(false);
  }
};

  // ✅ Referral Link
  const referralLink = `https://t.me/cipera_bot?startapp=${apiUser?.referralCode || ""}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    toast.success("Copied 🚀");
  };

  const handleShare = () => {
    const url = referralLink;
    window.open(
  `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  "_blank"
);
  };

  // ✅ Loading
  if (isLoading) return <SkeletonPage type="profile" />;
  if (isError) return <div>Error loading user</div>;


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
                {apiUser?.userId || "N/A"}
                </p>
              </div>

              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">PARENT ID</p>
                <p className="text-white">

  {apiUser?.referredBy || "N/A"}
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
  disabled={refLoading}
  className={`w-full py-2 rounded-lg flex items-center justify-center gap-2
  bg-gradient-to-r from-[#587FFF] to-[#09239F]
  ${refLoading  ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {refLoading  ? (
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