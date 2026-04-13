import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Footer from "../Footer";
import bgImg from "../../assets/bgImg.png";
import toast from "react-hot-toast";

// ─── Network config ───────────────────────────────────────────────────────────
const NETS = {
  BEP20_USDT:   { label: "BNB Smart Chain (BEP20)", color: "#F3BA2F" },
  POLYGON_USDT: { label: "Polygon Network",          color: "#8247E5" },
  BASE_USDT:    { label: "Base Network",             color: "#0052FF" },
  BASE_USDC:    { label: "Base Network",             color: "#0052FF" },
  WEB20_USDT:   { label: "Web20 / USDT",             color: "#26A17B" },
};

// ─── Seeded random ────────────────────────────────────────────────────────────
function seededRand(str) {
  let s = str.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 7) % 2147483647 || 1;
  return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; };
}

// ─── QR matrix builder ────────────────────────────────────────────────────────
function makeMatrix(str) {
  const N = 29;
  const r = seededRand(str);
  const m = Array.from({ length: N }, () => new Array(N).fill(0));

  function setFinder(row, col) {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const edge = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const mid  = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        m[row + dr][col + dc] = (edge || mid) ? 2 : 3;
      }
    }
  }
  setFinder(0, 0);
  setFinder(0, N - 7);
  setFinder(N - 7, 0);

  for (let i = 0; i < N; i++) {
    if (m[6][i] === 0) m[6][i] = 4;
    if (m[i][6] === 0) m[i][6] = 4;
  }
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++)
      if (m[i][j] === 0) m[i][j] = r() > 0.47 ? 1 : 0;

  return { m, N };
}

// ─── Logo drawers ─────────────────────────────────────────────────────────────
function drawLogoOnCtx(ctx, x, y, s, key) {
  const fillC = (cx, cy, r) => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.fill(); };

  if (key === "BEP20_USDT") {
    ctx.fillStyle = "#F3BA2F"; ctx.fillRect(x, y, s, s);
    ctx.fillStyle = "#fff";
    const cx = x + s / 2, cy = y + s / 2, r = s * 0.28;
    const d = (dx, dy, sz) => {
      ctx.beginPath();
      ctx.moveTo(dx, dy - sz); ctx.lineTo(dx + sz, dy);
      ctx.lineTo(dx, dy + sz); ctx.lineTo(dx - sz, dy);
      ctx.closePath(); ctx.fill();
    };
    d(cx, cy, r * 0.28);
    d(cx, cy - r * 0.58, r * 0.18); d(cx + r * 0.58, cy, r * 0.18);
    d(cx, cy + r * 0.58, r * 0.18); d(cx - r * 0.58, cy, r * 0.18);
    const dd = r * 0.42;
    d(cx + dd, cy - dd, r * 0.18); d(cx + dd, cy + dd, r * 0.18);
    d(cx - dd, cy - dd, r * 0.18); d(cx - dd, cy + dd, r * 0.18);

  } else if (key === "POLYGON_USDT") {
    ctx.fillStyle = "#8247E5"; ctx.fillRect(x, y, s, s);
    const cx = x + s / 2, cy = y + s / 2;
    const hex = (rr) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i - Math.PI / 6;
        i === 0 ? ctx.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a))
                : ctx.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      }
      ctx.closePath(); ctx.fill();
    };
    ctx.fillStyle = "#fff"; hex(s * 0.3);
    ctx.fillStyle = "#8247E5"; hex(s * 0.17);
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.round(s * 0.2)}px Arial`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("P", cx, cy + 1);

  } else if (key === "BASE_USDT" || key === "BASE_USDC") {
    ctx.fillStyle = "#0052FF"; ctx.fillRect(x, y, s, s);
    const cx = x + s / 2, cy = y + s / 2, r = s * 0.3;
    ctx.fillStyle = "#fff"; fillC(cx, cy, r);
    ctx.fillStyle = "#0052FF"; fillC(cx + r * 0.22, cy, r * 0.66);

  } else {
    // USDT / WEB20
    ctx.fillStyle = "#26A17B"; ctx.fillRect(x, y, s, s);
    ctx.fillStyle = "#fff";
    const cx = x + s / 2, cy = y + s / 2;
    ctx.fillRect(cx - s * 0.33, cy - s * 0.3,  s * 0.66, s * 0.13);
    ctx.fillRect(cx - s * 0.065, cy - s * 0.17, s * 0.13, s * 0.46);
    ctx.fillRect(cx - s * 0.24, cy - s * 0.02, s * 0.48, s * 0.1);
  }
}

// ─── Main QR renderer ─────────────────────────────────────────────────────────
function renderQR(canvas, address, networkKey) {
  const net = NETS[networkKey] || NETS["WEB20_USDT"];
  const ctx = canvas.getContext("2d");
  const W = canvas.width;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, W);

  const { m, N } = makeMatrix("addr" + networkKey);
  const cs    = Math.floor(W / N);
  const offX  = Math.floor((W - cs * N) / 2);
  const offY  = Math.floor((W - cs * N) / 2);
  const logoCx = W / 2, logoCy = W / 2, logoR = cs * 4.5;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const val   = m[i][j];
      const px    = offX + j * cs;
      const py    = offY + i * cs;
      const dotCx = px + cs / 2;
      const dotCy = py + cs / 2;
      const dist  = Math.sqrt((dotCx - logoCx) ** 2 + (dotCy - logoCy) ** 2);
      if (dist < logoR + 1) continue;

      if (val === 2) {
        ctx.fillStyle = net.color;
        ctx.fillRect(px + 1, py + 1, cs - 2, cs - 2);
      } else if (val === 3) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(px, py, cs, cs);
      } else if (val === 4) {
        ctx.fillStyle = i % 2 === 0 ? net.color : "#ffffff";
        ctx.fillRect(px + 1, py + 1, cs - 2, cs - 2);
      } else if (val === 1) {
        ctx.fillStyle = "#111827";
        ctx.beginPath();
        ctx.arc(dotCx, dotCy, cs * 0.42, 0, 6.2832);
        ctx.fill();
      }
    }
  }

  // White circle behind logo
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(logoCx, logoCy, logoR + 3, 0, 6.2832);
  ctx.fill();

  // Logo clipped to circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(logoCx, logoCy, logoR, 0, 6.2832);
  ctx.clip();
  drawLogoOnCtx(ctx, logoCx - logoR, logoCy - logoR, logoR * 2, networkKey);
  ctx.restore();

  // White ring
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(logoCx, logoCy, logoR + 1, 0, 6.2832);
  ctx.stroke();
}

// ─── Component ────────────────────────────────────────────────────────────────
const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    amount,
    coin,
    network,
    networkKey,
    walletAddress,
    qrData,
  } = location.state || {};

  const canvasRef = useRef(null);
  const [time, setTime] = useState(1200);
  const [isExpired, setIsExpired] = useState(false);

  // Draw QR once canvas is ready
  useEffect(() => {
    if (canvasRef.current && networkKey && walletAddress) {
      renderQR(canvasRef.current, walletAddress, networkKey);
    }
  }, [networkKey, walletAddress]);

  // Countdown timer
  useEffect(() => {
    if (time <= 0) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) { setIsExpired(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  // Auto redirect on expire
  useEffect(() => {
    if (isExpired) {
      toast.error("Payment Time Expired ⏳", { duration: 2000 });
      setTimeout(() => navigate("/addfund", { replace: true }), 1500);
    }
  }, [isExpired, navigate]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied Successfully ✅");
    } catch {
      toast.error("Failed to copy ❌");
    }
  };

  const handleShare = async (text) => {
    const shareText = `Pay ${amount} ${coin || "USDT"} to this address:\n${text}`;
    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.openTelegramLink(
          `https://t.me/share/url?url=${encodeURIComponent(text)}&text=${encodeURIComponent(shareText)}`
        );
        toast.success("Shared Successfully 🚀");
      } catch { toast.error("Share failed"); }
    } else if (navigator.share) {
      try {
        await navigator.share({ title: "Payment Details", text: shareText });
        toast.success("Shared Successfully 🚀");
      } catch { toast.error("Share cancelled"); }
    } else {
      toast.error("Sharing not supported on this device");
    }
  };

  if (!amount || !walletAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-red-400">Invalid payment data. Please try again.</p>
      </div>
    );
  }

  const netColor = NETS[networkKey]?.color || "#6366f1";
  const netLabel = NETS[networkKey]?.label || network;

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
      <div className="min-h-screen text-white px-3 py-4">
        <div className="max-w-md mx-auto space-y-5">

          {/* TIMER */}
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
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
          <div className="rounded-2xl border-2 border-[#444385] overflow-hidden text-center">
            <div className="bg-[#00000033] p-5 backdrop-blur-[20px]">
              <div className="bg-white p-3 rounded-xl inline-block">
                <canvas
                  ref={canvasRef}
                  width={200}
                  height={200}
                  style={{ display: "block", borderRadius: "8px" }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-3">Scan QR Code to Pay</p>
              <p className="text-xs mt-1 font-medium" style={{ color: netColor }}>
                {netLabel}
              </p>
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