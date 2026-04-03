import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "../Footer";
import bgImg from "../../assets/bgImg.png";

/* ================= TOAST HOOK ================= */
const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const Toast = () =>
    toast && (
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-sm z-50 backdrop-blur-md
        ${
          toast.type === "success"
            ? "bg-green-500/20 text-green-400 border border-green-500/40"
            : "bg-red-500/20 text-red-400 border border-red-500/40"
        }`}
      >
        {toast.msg}
      </div>
    );

  return { showToast, Toast };
};

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, coin } = location.state || {};

  const { showToast, Toast } = useToast();

  const [time, setTime] = useState(1200);

  /* ================= TIMER ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ================= AUTO REDIRECT ================= */
  useEffect(() => {
    if (time === 0) {
      showToast("Payment Time Expired ⏳", "error");
      setTimeout(() => {
        navigate("/addfund", { replace: true });
      }, 1200);
    }
  }, [time]);

  /* ================= FORMAT ================= */
  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  /* ================= DATA ================= */
  const wallet = "0x30Ed3289aFB346B14718f444355Ab59D43688c3b";

  /* ================= COPY ================= */
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied Successfully ✅");
  };

  /* ================= SHARE ================= */
  const handleShare = async (text) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Payment Details",
          text: text,
        });
        showToast("Shared Successfully 🚀");
      } catch {
        showToast("Share Cancelled ❌", "error");
      }
    } else {
      showToast("Sharing not supported ❌", "error");
    }
  };

  /* ================= ACTIONS ================= */
  const handleCancel = () => {
    showToast("Payment Cancelled ❌", "error");

    setTimeout(() => {
      navigate("/addfund", { replace: true });
    }, 1000);
  };

  const handleComplete = () => {
    showToast("Payment Submitted ✅");

    setTimeout(() => {
      navigate("/addfund", { replace: true });
    }, 1000);
  };

  return (
    <div
      className="pb-20"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen text-white px-3 py-4">
        <div className="max-w-md mx-auto space-y-5">

          

          {/* TIMER */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="bg-[#00000033] p-4 backdrop-blur-[20px] flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-400 text-sm">
                <Clock size={16} />
                Expires in {formatTime()}
              </div>

              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                Waiting
              </span>
            </div>
          </div>

          {/* QR */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden text-center">
            <div className="bg-[#00000033] p-5 backdrop-blur-[20px]">
              <div className="bg-white p-3 rounded-xl inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${wallet}`}
                  alt="qr"
                  className="w-44 h-44"
                />
              </div>

              <p className="text-sm text-gray-400 mt-3">
                Scan QR Code to Pay
              </p>
            </div>
          </div>

          {/* WALLET UI (UPDATED SAME AS REFERRAL) */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">

              <p className="text-sm text-gray-300 mb-2">Wallet Address</p>

              <div className="bg-black border border-[#81ECFF] rounded-lg p-2 text-xs mb-3 truncate">
                {wallet}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(wallet)}
                  className="flex-1 
bg-[linear-gradient(45deg,#587FFF,#09239F)] 
hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)]
text-white text-sm py-3 rounded-full 
flex items-center justify-center gap-2 transition-all"
                >
                  <Copy size={16} />
                  Copy
                </button>

                <button
                  onClick={() => handleShare(wallet)}
                  className="flex-1 
bg-[linear-gradient(45deg,#587FFF,#09239F)] 
hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)]
text-white text-sm py-3 rounded-full 
flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
              <p className="text-xs text-gray-400 mb-1">Amount to Pay</p>

              <h2 className="text-xl font-bold">
                {amount || "0"} {coin?.name || "USDT"}
              </h2>

              <p className="text-xs text-blue-400 mt-1">
                Binance Smart Chain (BEP20)
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="w-full py-3 rounded-xl border border-red-500/40
              bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleComplete}
              className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-[#587FFF] to-[#09239F]
              shadow-lg shadow-blue-500/30
              hover:scale-[1.02] transition"
            >
              Complete
            </button>
          </div>

        </div>
      </div>

      {/* TOAST */}
      <Toast />

      <Footer />
    </div>
  );
};

export default PaymentScreen;