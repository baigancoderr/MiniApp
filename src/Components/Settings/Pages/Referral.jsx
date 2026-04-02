import React from 'react';
import btmimg from "../../../assets/btmimg.png";
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, Settings } from "lucide-react";
import { useState } from "react";
import { Users, User, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Referral = () => {
  const navigate = useNavigate();
  return (
    <div className="  pb-20 py-3 px-3  text-white font-sans flex justify-center">
      <div className="w-full max-w-md mx-auto   relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">Referral</h2>
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

        {/* Referral Earning History */}
        <div className=" pb-6">
          <div
            className="rounded-2xl p-2 px-4 flex items-center justify-between cursor-pointer shadow-md transition"
            style={{
              background: "linear-gradient(45deg, #264DCD 0%, #102692 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/70 backdrop-blur rounded-xl flex items-center justify-center">
                💰
              </div>
              <div>
                <p className="text-sm text-white font-medium">
                  Referral earning history
                </p>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Stats Cards */}


        <div className=" grid grid-cols-2 gap-4">

          {/* Direct Referrals */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-2 py-3">

            {/* Title Row */}
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-emerald-400" />
              <p className="text-xs text-gray-400">Direct Referrals</p>
            </div>

            {/* Value */}
            <p className="text-xl font-bold">0</p>

            {/* Subtext */}
            <p className="text-emerald-400 text-sm">Active Users</p>
          </div>


          {/* Team Size */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-3">

            {/* Title Row */}
            <div className="flex items-center gap-2 mb-2">
              <Network size={18} className="text-blue-400" />
              <p className="text-xs text-gray-400">Team Size</p>
            </div>

            {/* Value */}
            <p className="text-xl font-bold">0</p>

            {/* Subtext */}
            <p className="text-blue-400 text-sm">Total Network</p>
          </div>

        </div>

        {/* Main Image Section with Overlay Text */}
        <div className="relative mt-3">
          {/* Your Image */}
          <img
            src={btmimg}
            alt="No Referrals"
            className="w-full rounded-3xl"
          />

          {/* Text & Button Overlay on Image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <div className="mt-4"> {/* Adjust margin-top to position text properly over image */}
              <h2 className="text-lg font-semibold mb-2">No Referrals Yet</h2>
              <p className="text-gray-300 text-[14px] leading-relaxed max-w-[330px]">
                Start sharing your referral code to earn commission on every trade your friends make.
              </p>
            </div>

            {/* Invite Button - positioned at bottom of image */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-16">
              <button
                className="w-full font-semibold text-md py-[10px] rounded-xl shadow-xl active:scale-95 transition-all text-white"
                style={{
                  background: 'linear-gradient(45deg, #587FFF 0%, #09239F 100%)'
                }}
              >
                Invite Friends
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Referral;