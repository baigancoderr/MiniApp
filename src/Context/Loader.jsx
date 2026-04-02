import React, { useEffect, useState } from "react";
import centerlogo from "../assets/setting/cipera icon.png";

const Loader = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(true);

      setTimeout(() => {
        setShowLogo(false);
      }, 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">

      {/* SVG Filter */}
      <svg className="w-0 h-0">
        <filter id="gooey">
          <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
          <feColorMatrix
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10
            "
          />
        </filter>
      </svg>

      <div className="relative w-[180px] h-[180px] flex items-center justify-center animate-rotate">

        {/* ✅ LOGO (NO FILTER) */}
        <div
          className={`absolute z-50 transition-all duration-300 ${
            showLogo ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <img
            src={centerlogo}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* ✅ LIQUIDS WRAPPER (FILTER HERE ONLY) */}
        <div className="absolute inset-0 filter-[url(#gooey)]">
          <div className="liquid animate-animate1 bg-[linear-gradient(45deg,#587FFF_0%,#09239F_100%)]"></div>
          <div className="liquid animate-animate2 bg-[linear-gradient(45deg,#587FFF_0%,#09239F_100%)]"></div>
          <div className="liquid animate-animate3 bg-[linear-gradient(45deg,#587FFF_0%,#09239F_100%)]"></div>
          <div className="liquid animate-animate4 bg-[linear-gradient(45deg,#587FFF_0%,#09239F_100%)]"></div>
        </div>
      </div>

      <style>
        {`
          .liquid {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border-radius: 9999px;
            animation-duration: 1.3s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .liquid:nth-child(1) { top: 0; }
          .liquid:nth-child(2) { left: 0; }
          .liquid:nth-child(3) { left: 100%; }
          .liquid:nth-child(4) { top: 100%; }

          @keyframes rotate {
            0% { transform: rotate(360deg); }
            50% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }

          .animate-rotate {
            animation: rotate 4s ease-in-out infinite;
          }

          @keyframes animate1 {
            0% { top: 0; }
            50% { top: 100%; }
            100% { top: 100%; }
          }

          @keyframes animate2 {
            0% { left: 0; }
            50% { left: 100%; }
            100% { left: 100%; }
          }

          @keyframes animate3 {
            0% { left: 100%; }
            50% { left: 0; }
            100% { left: 0; }
          }

          @keyframes animate4 {
            0% { top: 100%; }
            50% { top: 0; }
            100% { top: 0; }
          }

          .animate-animate1 { animation-name: animate1; }
          .animate-animate2 { animation-name: animate2; }
          .animate-animate3 { animation-name: animate3; }
          .animate-animate4 { animation-name: animate4; }
        `}
      </style>
    </div>
  );
};

export default Loader;