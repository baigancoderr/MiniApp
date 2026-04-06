'use client';

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, User, Clock, Package, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usdt from "../../assets/usdt.png";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AddFundPage = () => {
  const navigate = useNavigate();

  const coins = [{ name: "USDT", icon: usdt }];
  
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState(coins[0]);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Get userId from localStorage (same as your Profile component)
  const getUserId = () => {
    try {
      const userStr = localStorage.getItem("user"); // or wherever you store full user
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.userId || user._id;
      }
      return localStorage.getItem("userId"); // fallback
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickAmount = (value) => {
    setAmount(value.replace("$", ""));
  };

  const handleDeposit = async () => {
    const userId = getUserId();

    if (!userId) {
      toast.error("Please login again ❌");
      navigate("/settings"); // or login page
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Please Enter Your Amount ❌");
      return;
    }

    if (!isChecked) {
      toast.error("Please Accept Terms & Conditions ❌");
      return;
    }

    if (Number(amount) < 2) {
      toast.error("Minimum deposit is $2 USDT");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/user/deposit/create", {
        userId: userId,           // ← Now sending real userId
        amount: Number(amount),
        coin: selected.name,
        network: "TRC20"
      });

      const data = res.data;

      if (data.success && data.data?.address_in) {
        toast.success("Payment address generated ✅");

        navigate("/payment", {
          state: {
            amount: amount,
            coin: selected,
            walletAddress: data.data.address_in,
            qrData: data.data.address_in,
            callbackInfo: data.data,
          },
        });
      } else {
        toast.error(data.message || "Failed to generate address");
      }
    } catch (error) {
      console.error("Deposit API Error:", error);
      const msg = error.response?.data?.message || 
                  error.response?.data?.error || 
                  "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 text-white px-3 py-3">
      <div className="max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold">Add Fund</h1>
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

        {/* AMOUNT CARD */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden mb-5">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-gray-400 text-xs mb-2">Enter Amount</p>

            <div className="flex items-center bg-black border border-[#444385] rounded-lg px-3 py-2 relative">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent outline-none text-white flex-1 min-w-0"
              />

              <div
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer ml-2 shrink-0"
              >
                <img src={selected.icon} className="w-4 h-4" alt={selected.name} />
                <span className="text-sm whitespace-nowrap">{selected.name}</span>
                <span className="text-xs text-gray-400">▼</span>
              </div>

              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-1 w-28 bg-black border border-[#444385] rounded-md z-50"
                >
                  {coins.map((coin) => (
                    <div
                      key={coin.name}
                      onClick={() => {
                        setSelected(coin);
                        setOpen(false);
                      }}
                      className="px-3 py-1.5 cursor-pointer text-sm hover:bg-[#444385]/50"
                    >
                      {coin.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs text-blue-400 mt-2">Minimum: $2 USDT</p>
          </div>
        </div>

        {/* QUICK AMOUNTS */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {["$25", "$50", "$100", "$200"].map((amt) => (
            <button
              key={amt}
              onClick={() => handleQuickAmount(amt)}
              className="rounded-xl border-2 border-[#444385] overflow-hidden group"
            >
              <div className="bg-[#00000033] py-3 text-sm group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)] transition-all">
                {amt}
              </div>
            </button>
          ))}
        </div>

        {/* PAYMENT INSTRUCTIONS */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden mb-6">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px] space-y-4">
            <div className="flex gap-3">
              <Clock className="text-blue-400" size={18} />
              <div>
                <p className="text-sm">20 Minute Timeout</p>
                <p className="text-xs text-gray-400">Complete payment within 20 minutes.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Package className="text-blue-400" size={18} />
              <div>
                <p className="text-sm">Single Transaction</p>
                <p className="text-xs text-gray-400">Send exact amount in one transaction.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="text-blue-400" size={18} />
              <div>
                <p className="text-sm">Network Confirmation</p>
                <p className="text-xs text-gray-400">Funds will reflect after confirmations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* TERMS */}
        <div className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 accent-blue-500"
          />
          <p className="text-xs text-gray-400 leading-relaxed">
            I agree to the{" "}
            <Link 
              to="/settings/term-condition" 
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link 
              to="/settings/privacy" 
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        <button
          onClick={handleDeposit}
          disabled={loading}
          className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-[#587FFF] to-[#09239F] hover:scale-[1.02] transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Address..." : "Deposit"}
        </button>

      </div>
    </div>
  );
};

export default AddFundPage;