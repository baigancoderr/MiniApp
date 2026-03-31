import React from "react";
import { ArrowLeft, Settings, Copy, Share2 } from "lucide-react";
import userimg2 from "../../../assets/Setting/user-img.jpeg";
import cipera from "../../../assets/Setting/cipera.png";
import user from "../../../assets/logo.png"; 

const Profile = ({ onBack }) => {
    const stats = [
        { label: "Daily Earnings", value: "18", sub: "/day", usd: "$0.90" },
        { label: "Utility Wallet", value: "0.00", usd: "$0.00" },
        { label: "Earning Wallet", value: "0.00", usd: "$0.00" },
        { label: "Lifetime Mining", value: "0.00", usd: "$0.00" },
        { label: "CIP Referral", value: "0.00", usd: "$0.00" },
        { label: "USDT Referral", value: "0.00", usd: "$0.00" },
        { label: "Staking Earning", value: "0.00", usd: "$0.00" },
        { label: "USDT Earning", value: "0.00", usd: "$0.00" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center px-2 py-3 pb-20 text-white  relative">

         
            <div className="w-full max-w-md mx-auto">

              

                {/* HEADER */}
                <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2">
                    <div className="flex items-center gap-3">
                        <button className="p-1.5 rounded-md text-[#FFFFFF]">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-lg font-[Manrope] font-bold">Profile</h1>
                    </div>
                    <Settings size={20} className="text-white" />
                </div>

                {/* PROFILE CARD */}
                <div className="px-4">
                    <div className="relative rounded-2xl border-2 border-[#81ECFF99] p-[1px] mb-5 
          bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)]">

                        <div className="relative rounded-2xl  p-4 overflow-hidden">

                            {/* inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />

                            <div className="relative flex justify-center items-center gap-4 mb-4">
                                <img
                                    src={userimg2}
                                    className="w-20 h-20 rounded-full object-cover border border-white/20"
                                />

                                <div>
                                    <h2 className="text-xl font-bold text-[#fff] font-[Poppins] mb-3">XYZ</h2>
                                    <span className="text-xs px-3 font-[Manrope] font-bold py-[4px] rounded-full text-[#fff] border border-[#A68CFF4D] bg-[#866AC033]">
                                        FREE MINER
                                    </span>
                                </div>
                            </div>

                            {/* IDS */}
                            <div className="relative grid grid-cols-2 gap-3">
                                <div className="bg-[#0000001A] hover:bg-[linear-gradient(185.32deg,_rgba(10,61,248,0.3)_4.26%,_rgba(28,41,88,0.3)_244.76%)] backdrop-blur-[50px] shadow-[0px_4px_4px_0px_#00000040] rounded-xl p-3 border border-[#444B55]">
                                    <p className="text-xs font-[Manrope] text-white font-[600] mb-1">USER ID</p>
                                    <p className="text-base font-[400] text-white font-[Poppins]">CIP579317981</p>
                                </div>

                                <div className="bg-[#0000001A] hover:bg-[linear-gradient(185.32deg,_rgba(10,61,248,0.3)_4.26%,_rgba(28,41,88,0.3)_244.76%)] backdrop-blur-[50px] shadow-[0px_4px_4px_0px_#00000040] rounded-xl p-3 border border-[#444B55]">
                                    <p className="text-xs font-[Manrope] text-white font-[600] mb-1">PARENT ID</p>
                                    <p className="text-base font-[400] text-white font-[Poppins] ">CIP1656587816</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {stats.map((item, i) => (
                            <div
                                key={i}
                                className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden"
                            >
                                <div
                                    className="
                                    bg-[#00000033]
                                    p-3 h-full
                                    backdrop-blur-[20px]

                                    transition-all duration-300

                                    group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
                                    group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
                                "
                                >

                                    {/* ROW LAYOUT */}
                                    <div className="flex items-start gap-3">

                                        {/* ICON (LEFT) */}
                                        <div
                                            className="
                                            w-8 h-8 rounded-full flex items-center justify-center text-xs
                                            
                                            transition-all duration-300
                                            shrink-0
                                        "
                                        >
                                           <img src={cipera} alt="" />
                                        </div>

                                        {/* CONTENT (RIGHT) */}
                                        <div className="flex-1">

                                            <p className="text-sm text-[#fff] font-[Manrope] font-[400]">
                                                {item.label}
                                            </p>

                                            <div className="flex items-end gap-1 mt-1">
                                                <p className="text-lg font-bold font-[Space Grotesk] text-white">
                                                    {item.value}
                                                </p>
                                                {item.sub && (
                                                    <span className="text-xs text-[#fff] font-[Space Grotesk] font-[500]">
                                                        {item.sub}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-xs text-[#fff] font-[Space Grotesk] font-[500]">
                                                {item.usd}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* REFERRAL */}
                    {/* <div className="rounded-2xl p-[1px] bg-[#81ECFF]"> */}
                        <div className="bg-[#1B2028] border border-[#81ECFF] rounded-xl p-4">

                            <p className="text-base font-[Manrope] text-white font-[700] mb-3">
                                Your Referral ID
                            </p>

                            <div className="bg-[#000] border border-[#81ECFF] rounded-full py-3 text-center font-[Poppins] font-[400] text-[#fff] text-base tracking-widest mb-4">
                                CIP579317981
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-[linear-gradient(0deg,_#587FFF_0%,_#09239F_70%)] font-[Poppins] font-[400] text-[#fff] text-base py-3 rounded-full flex items-center justify-center gap-2">
                                    <Copy size={18} />
                                    Copy Link
                                </button>

                                <button className="flex-1 bg-[linear-gradient(0deg,_#587FFF_0%,_#09239F_70%)] font-[Poppins] font-[400] text-[#fff] text-base py-3 rounded-full flex items-center justify-center gap-2">
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>

                        </div>
                    {/* </div> */}

                </div>

            </div>
        </div>
    );
};

export default Profile;