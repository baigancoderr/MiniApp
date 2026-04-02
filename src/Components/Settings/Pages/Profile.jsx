import React, { useState } from "react";
import { ArrowLeft, User, Copy, Share2 } from "lucide-react";
import userimg2 from "../../../assets/Setting/user-img.jpeg";
import cipera from "../../../assets/Setting/cipera.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  // ✅ Referral
  const referralLink = "https://yourapp.com/ref/CPR1234567";

  // ✅ Wallet State
  const [walletAddress, setWalletAddress] = useState("0xA1b2C3d4E5F6...");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Now 🚀",
        text: "Join using my referral link and earn rewards!",
        url: referralLink,
      });
    } else {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent("Join and earn 🚀")}`;
      window.open(telegramUrl, "_blank");
    }
  };

  // ✅ Copy
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = referralLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      toast.success("Copied 🚀");
    } catch {
      toast.error("Copy failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-2 py-3 text-white bg-[#0B0F19]">
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
              shadow-lg shadow-blue-500/20
              cursor-pointer active:scale-95 transition"
                    >
                      <User size={18} />
                    </div>
        </div>

        {/* PROFILE CARD */}
        <div className="relative rounded-2xl border border-[#81ECFF99] p-[1px] mb-5 bg-gradient-to-br from-blue-500/20 to-black/30">
          <div className="rounded-2xl p-4 bg-[#0B0F19]">

            <div className="flex items-center gap-4 mb-4">
              <img
                src={userimg2}
                className="w-20 h-20 rounded-full border border-white/20 object-cover"
              />

              <div>
                <h2 className="text-xl font-bold">XYZ</h2>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20">
                  Investor
                </span>
              </div>
            </div>

            {/* IDs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">USER ID</p>
                <p className="text-white">CIP579317981</p>
              </div>

              <div className="bg-[#00000020] p-3 rounded-xl border border-[#444B55]">
                <p className="text-xs text-gray-400">PARENT ID</p>
                <p className="text-white">CIP1656587816</p>
              </div>
            </div>

          </div>
        </div>

        {/* 🔥 WALLET ADDRESS SECTION */}
        <div className="rounded-xl border border-[#444B55] p-4 bg-[#00000020] mb-5">

          <p className="text-sm text-gray-300 mb-2">Wallet Address</p>

          <div className="flex flex-col gap-3">

            <input
              type="text"
              value={walletAddress}
              disabled={!isEditing}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm bg-black border 
              ${isEditing ? "border-[#81ECFF]" : "border-[#444B55]"} 
              text-white outline-none`}
            />

            <div className="flex gap-2">

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-gradient-to-r from-[#587FFF] to-[#09239F] py-2 rounded-lg text-sm"
                >
                  Edit Address
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      toast.success("Wallet Updated ✅");
                    }}
                    className="flex-1 bg-green-500 py-2 rounded-lg text-sm"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-600 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>
          </div>
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
              <Copy size={16} />
              Copy
            </button>

            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-[#587FFF] to-[#09239F] py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Share2 size={16} />
              Share
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
