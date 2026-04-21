import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Copy, Share2 } from "lucide-react";
import userimg2 from "../../../assets/setting/user-img.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import SkeletonPage from "../../../Layout/Skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("NO_TOKEN");

  const res = await api.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.data.success) throw new Error("FETCH_FAILED");

  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};

const WebProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inputReferral, setInputReferral] = useState("");
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [saving, setSaving] = useState(false);

  // TanStack Query for /me
  const {
    data: apiUser,
    isLoading: meLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!localStorage.getItem("token"),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const showSkeleton = meLoading && !apiUser;

  // Sync wallet when user data loads
  useEffect(() => {
    if (apiUser?.walletAddress) {
      setWalletAddress(apiUser.walletAddress);
      setIsEditing(false);
    }
  }, [apiUser]);

  // Web Register / Login
  const handleWebSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and Email are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post("/user/web-register", {
        name,
        email: email.toLowerCase(),
        referralCode: inputReferral || undefined,
      });

      const data = res.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId || data.user._id);

        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["me"] });
        setShowReferralPopup(false);
      } else if (data.isNewUser) {
        setShowReferralPopup(true);
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Referral Submit
  const handleReferralSubmit = async () => {
    if (!/^CPR[A-Z0-9]{6}$/.test(inputReferral)) {
      toast.error("Invalid Referral Code");
      return;
    }
    handleWebSubmit({ preventDefault: () => {} });
  };

  // Save / Update Wallet
  const handleSaveWallet = async () => {
    if (!walletAddress.trim()) {
      toast.error("Enter wallet address");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const isUpdate = !!apiUser?.walletAddress;

      const res = isUpdate
        ? await api.put("/user/update-wallet", { walletAddress }, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await api.post("/user/add-wallet", { walletAddress }, {
            headers: { Authorization: `Bearer ${token}` },
          });

      if (res.data.success) {
        toast.success(res.data.message || "Wallet saved successfully");
        await queryClient.invalidateQueries({ queryKey: ["me"] });
        setIsEditing(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save wallet");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = () => setIsEditing(true);

  const referralLink = `https://yourwebsite.com/register?ref=${apiUser?.referralCode || ""}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleShare = () => {
    const text = "Join Cipera and earn daily income 🚀";
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, "_blank");
  };

  // Show skeleton while loading
  if (showSkeleton) {
    return <SkeletonPage type="profile" />;
  }

  // Not Logged In - Show Registration Form
  if (!apiUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 ">
        <div className="w-full max-w-md  border border-[#444B55] rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleWebSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-[#444B55] rounded-xl text-white"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-[#444B55] rounded-xl text-white"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-[#587FFF] to-[#09239F] rounded-xl font-medium disabled:opacity-70"
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Logged In - Show Full Profile
  return (
    <div className="min-h-screen flex justify-center pb-24 px-2 py-3 text-white">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-[#00000033] border border-[#444385]">
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">My Account</h2>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#587FFF] to-[#09239F]">
            <User size={18} />
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative rounded-2xl border border-[#81ECFF99] p-[1px] mb-6 bg-gradient-to-br from-blue-500/20 to-black/30">
          <div className="rounded-2xl p-5 bg-[#0B0F19]">
            <div className="flex items-center gap-4">
              <img
                src={userimg2}
                className="w-20 h-20 rounded-full border border-white/20 object-cover"
                alt="user"
              />
              <div>
                <h2 className="text-xl font-bold">{apiUser.name}</h2>
                <p className="text-sm text-gray-400">{apiUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">USER ID</p>
                <p className="font-medium">{apiUser.userId}</p>
              </div>
              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">REFERRED BY</p>
                <p className="font-medium">{apiUser.referredBy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="rounded-xl border border-[#444B55] p-5 bg-[#00000020] mb-6">
          <p className="text-sm text-gray-300 mb-3">Wallet Address</p>
          <input
            type="text"
            value={walletAddress}
            disabled={!isEditing}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address"
            className={`w-full px-4 py-3 rounded-xl text-sm bg-black border mb-4 ${
              isEditing ? "border-[#81ECFF]" : "border-[#444B55]"
            }`}
          />
          {isEditing ? (
            <button
              onClick={handleSaveWallet}
              disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-[#587FFF] to-[#09239F] rounded-xl disabled:opacity-50"
            >
              {saving ? "Saving..." : apiUser.walletAddress ? "Update Wallet" : "Save Wallet"}
            </button>
          ) : (
            <button onClick={handleUpdate} className="w-full py-3 bg-green-600 rounded-xl">
              Edit Wallet
            </button>
          )}
        </div>

        {/* Referral Section */}
        <div className="rounded-xl border border-[#444B55] p-5 bg-[#00000020]">
          <p className="text-sm text-gray-300 mb-3">Your Referral Link</p>
          <div className="bg-black border border-[#81ECFF] rounded-xl p-3 text-xs break-all mb-4">
            {referralLink}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#587FFF] to-[#09239F] rounded-xl"
            >
              <Copy size={18} /> Copy
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#587FFF] to-[#09239F] rounded-xl"
            >
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebProfile;