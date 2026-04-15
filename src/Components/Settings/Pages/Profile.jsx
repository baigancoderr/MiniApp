import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Copy, Share2 } from "lucide-react";
import userimg2 from "../../../assets/setting/user-img.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tgUser, setTgUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [inputReferral, setInputReferral] = useState("");

  // Fetch User Data using TanStack Query
  const {
    data: apiUser,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    },
    enabled: !!localStorage.getItem("token"),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Initialize Telegram + Auto Login / Referral Check
  useEffect(() => {
    const initTelegram = async () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        console.log("Not inside Telegram WebApp");
        return;
      }

      tg.ready();
      const user = tg.initDataUnsafe?.user;

      if (!user) {
        console.log("No Telegram user found");
        return;
      }

      setTgUser(user);

      const token = localStorage.getItem("token");

      // If no token → Try auto login first
      if (!token) {
        try {
          const res = await api.post("/user/telegram-login", {
            telegramId: user.id,
            name: `${user.first_name} ${user.last_name || ""}`,
            username: user.username || "",
            referralCode: "", // First attempt without referral
          });

          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            queryClient.invalidateQueries({ queryKey: ["user"] });
          } else if (res.data.isNewUser) {
            setShowReferralPopup(true);
          }
        } catch (err) {
          console.error("Auto login failed:", err);
          // If it requires referral, popup will show via query error handling or retry
        }
      }
    };

    initTelegram();
  }, [queryClient]);

  // Wallet Save Mutation
  const saveWalletMutation = useMutation({
    mutationFn: async (address) => {
      const token = localStorage.getItem("token");
      const isUpdate = !!apiUser?.walletAddress;

      const res = await api[isUpdate ? "put" : "post"](
        isUpdate ? "/user/update-wallet" : "/user/add-wallet",
        { walletAddress: address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Wallet saved successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to save wallet ❌");
    },
  });

  const handleSaveWallet = () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter wallet address ❌");
      return;
    }
    saveWalletMutation.mutate(walletAddress);
  };

  const handleUpdateWallet = () => {
    setIsEditing(true);
  };

  // Sync wallet address when user data loads
  useEffect(() => {
    if (apiUser?.walletAddress) {
      setWalletAddress(apiUser.walletAddress);
      setIsEditing(false);
    }
  }, [apiUser]);

  // Referral Link
  const referralLink = `https://t.me/cipera_bot?startapp=${apiUser?.referralCode || "loading"}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied! 🚀");
    } catch {
      toast.error("Failed to copy ❌");
    }
  };

  const handleShare = () => {
    const text = "Join Cipera and earn rewards! 🚀";
    const url = referralLink;

    if (window.Telegram?.WebApp) {
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      window.Telegram.WebApp.openTelegramLink(shareUrl);
    } else if (navigator.share) {
      navigator.share({ title: "Join Now", text, url });
    } else {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  // Referral Submit (for new users)
  const handleReferralSubmit = async () => {
    if (!/^CPR[A-Z0-9]{6}$/.test(inputReferral)) {
      toast.error("Invalid Referral Code ❌");
      return;
    }

    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (!user) {
      toast.error("Telegram user not found");
      return;
    }

    try {
      const res = await api.post("/user/telegram-login", {
        telegramId: user.id,
        name: `${user.first_name} ${user.last_name || ""}`,
        username: user.username || "",
        referralCode: inputReferral,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowReferralPopup(false);
        toast.success("Login successful ✅");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong ❌");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <p>Error loading profile: {error?.message}</p>
        <button onClick={() => refetch()} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center pb-24 px-2 py-3 text-white">
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
              bg-gradient-to-r from-[#587FFF] to-[#09239F] shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition"
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
                alt="profile"
              />
              <div>
                <h2 className="text-xl font-bold">
                  {tgUser ? `${tgUser.first_name} ${tgUser.last_name || ""}` : apiUser?.name || "User"}
                </h2>
                <p className="text-xs text-gray-400">
                  {tgUser?.username ? `@${tgUser.username}` : ""}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">USER ID</p>
                <p className="text-white font-medium">{apiUser?.userId || "N/A"}</p>
              </div>
              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">PARENT ID</p>
                <p className="text-white font-medium">{apiUser?.referredBy || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* WALLET SECTION */}
        <div className="rounded-xl border border-[#444B55] p-4 bg-[#00000020] mb-5">
          <p className="text-sm text-gray-300 mb-2">Wallet Address</p>

          <input
            type="text"
            value={walletAddress}
            disabled={!isEditing}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address"
            className={`w-full px-3 py-2 rounded-lg text-sm bg-black border 
              ${isEditing ? "border-[#81ECFF]" : "border-[#444B55]"} 
              text-white mb-3`}
          />

          {isEditing ? (
            <button
              onClick={handleSaveWallet}
              disabled={saveWalletMutation.isPending}
              className="w-full bg-gradient-to-r from-[#587FFF] to-[#09239F] py-2 rounded-lg text-sm disabled:opacity-70"
            >
              {saveWalletMutation.isPending ? "Saving..." : apiUser?.walletAddress ? "Update Wallet" : "Save Wallet"}
            </button>
          ) : (
            <button
              onClick={handleUpdateWallet}
              className="w-full bg-green-500 py-2 rounded-lg text-sm"
            >
              Edit Wallet
            </button>
          )}
        </div>

        {/* REFERRAL SECTION */}
        <div className="rounded-xl border border-[#444B55] p-4 bg-[#00000020]">
          <p className="text-sm text-gray-300 mb-2">Referral Link</p>

          <div className="bg-black border border-[#81ECFF] rounded-lg p-3 text-xs mb-3 break-all font-mono">
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

      {/* REFERRAL POPUP FOR NEW USERS */}
      {showReferralPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0B0F19] border border-[#81ECFF] rounded-2xl p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Enter Referral Code</h2>

            <div className="flex flex-col items-center mb-5">
              <img
                src={tgUser?.photo_url || userimg2}
                className="w-20 h-20 rounded-full mb-3 border border-white/20"
                alt="avatar"
              />
              <p className="font-medium">{tgUser?.first_name} {tgUser?.last_name}</p>
              <p className="text-xs text-gray-400">@{tgUser?.username}</p>
            </div>

            <input
              type="text"
              value={inputReferral}
              onChange={(e) => setInputReferral(e.target.value.toUpperCase())}
              placeholder="CPRXXXXXX"
              className="w-full px-4 py-3 rounded-xl bg-black border border-[#444] text-white mb-4 text-center tracking-widest"
            />

            <button
              onClick={handleReferralSubmit}
              className="w-full py-3 bg-gradient-to-r from-[#587FFF] to-[#09239F] rounded-xl font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;