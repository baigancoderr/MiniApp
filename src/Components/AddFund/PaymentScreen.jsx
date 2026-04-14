import { useLocation, useNavigate } from "react-router-dom";
import { Copy, Share2, Clock ,ArrowLeft ,User  } from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "../Footer";
import bgImg from "../../assets/bgImg.png";
import toast from "react-hot-toast";
import usdt from "../../assets/usdt.png";
import usdc from "../../assets/usdc.png";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from AddFundPage
  const { 
    amount, 
    coin, 
    walletAddress, 
    qrData 
  } = location.state || {};

  const [time, setTime] = useState(1200); // 20 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  // Timer
  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // Auto redirect when time expires
  useEffect(() => {
    if (isExpired) {
      toast.error("Payment Time Expired ⏳", { duration: 2000 });
      
      setTimeout(() => {
        navigate("/addfund", { replace: true });
      }, 1500);
    }
  }, [isExpired, navigate]);

  // Format Time (MM:SS)
  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Copy to clipboard
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied Successfully ✅");
    } catch {
      toast.error("Failed to copy ❌");
    }
  };

  // Share (Telegram + Web Share)
  const handleShare = async (text) => {
    const shareText = `Pay ${amount} ${coin?.name || "USDT"} to this address:\n${text}`;

    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.openTelegramLink(
          `https://t.me/share/url?url=${encodeURIComponent(text)}&text=${encodeURIComponent(shareText)}`
        );
        toast.success("Shared Successfully 🚀");
      } catch {
        toast.error("Share failed");
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: "Payment Details",
          text: shareText,
        });
        toast.success("Shared Successfully 🚀");
      } catch {
        toast.error("Share cancelled");
      }
    } else {
      toast.error("Sharing not supported on this device");
    }
  };

  const handleCancel = () => {
    toast.error("Payment Cancelled ❌");
    setTimeout(() => {
      navigate("/addfund", { replace: true });
    }, 800);
  };

  const handleComplete = () => {
    toast.success("Payment Submitted ✅\nWaiting for confirmation...");
    setTimeout(() => {
      navigate("/addfund", { replace: true });
    }, 1200);
  };

  // Safety check
  if (!amount || !walletAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-red-400">Invalid payment data. Please try again.</p>
      </div>
    );
  }

  return (
    <div
      className="pb-20 min-h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen  text-white px-3 py-4">
        <div className="max-w-md mx-auto ">

   {/* Header */}
          <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold">Scan QR Code</h1>
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

          {/* TIMER */}
          <div className="rounded-2xl border-2 border-[#444385] mb-5 overflow-hidden">
            <div className="bg-[#00000033] p-4 backdrop-blur-[20px] flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-400 text-sm">
                <Clock size={16} />
                Expires in {formatTime()}
              </div>
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                Waiting
              </span>
            </div>
          </div>

          {/* QR CODE */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden text-center mb-5">
            <div className="bg-[#00000033] p-5 backdrop-blur-[20px]">
              <div className="bg-white p-3 rounded-xl inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData || walletAddress)}`}
                  alt="QR Code"
                  className="w-44 h-44"
                />
              </div>
              <p className="text-sm text-gray-400 mt-3">Scan QR Code to Pay</p>
            </div>
          </div>

          {/* WALLET ADDRESS */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
              <p className="text-sm text-gray-300 mb-2">Wallet Address</p>

              <div className="bg-black border border-[#81ECFF] rounded-lg p-3 text-xs mb-4 break-all font-mono">
                {walletAddress}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(walletAddress)}
                  className="flex-1 bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:brightness-110 text-white text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Copy size={16} />
                  Copy
                </button>

                <button
                  onClick={() => handleShare(walletAddress)}
                  className="flex-1 bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:brightness-110 text-white text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          

        
          
        

        
          <p className="text-center text-[10px] text-gray-500 pt-2">
            Funds will be credited automatically after network confirmation
          </p>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentScreen;