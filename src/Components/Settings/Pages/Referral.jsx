import React, { useState, useEffect } from "react";
import btmimg from "../../../assets/btmimg.png";
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, Settings, Gift, Users, User, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";
const Referral = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ API States
  const [directReferrals, setDirectReferrals] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [earningsData, setEarningsData] = useState([]);   // For table (you can fetch real earnings later)
  const [treeData, setTreeData] = useState(null);         // Raw tree from API

  // 🔥 Fetch Team Tree + Stats
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Fetch Team Tree (as per your JSON response)
        const res = await api.get("/user/team-tree-view");   // Adjust endpoint if different (e.g. /user/team-tree)

        if (res.data.status === "success") {
          const apiData = res.data.data;
          setTreeData(apiData.tree);

          // ✅ Calculate Stats from Tree
          const calculated = calculateTeamStats(apiData.tree);
          setDirectReferrals(calculated.directCount);
          setTeamSize(calculated.totalTeamSize);

          // 🔥 Dummy earnings for now (replace with real earnings API later)
          const dummyEarnings = Array.from({ length: 25 }, (_, i) => ({
            id: "CIP" + (10000 + i),
            name: ["Rahul", "Amit", "Suresh", "Vikas"][i % 4],
            type: i % 2 === 0 ? "Direct" : "Level",
            amount: (5 + i).toString(),
            date: "12 Mar 2026",
          }));
          setEarningsData(dummyEarnings);
        } else {
          throw new Error(res.data.message || "Failed to fetch team data");
        }
      } catch (err) {
        console.error("Referral Data Fetch Error:", err);
        setError("Failed to load referral data");
        toast.error("Failed to load referral data ❌");

        // Fallback to 0
        setDirectReferrals(0);
        setTeamSize(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  // 🔥 Helper: Calculate Direct Referrals + Total Team Size from Tree
  const calculateTeamStats = (treeArray) => {
    if (!treeArray || treeArray.length === 0) return { directCount: 0, totalTeamSize: 0 };

    let directCount = 0;
    let totalTeamSize = 0;

    const traverse = (nodes) => {
      nodes.forEach((node) => {
        totalTeamSize += 1;   // Count every user in the tree

        if (node.level === 1) {
          directCount += 1;   // Level 1 = Direct Referrals
        }

        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      });
    };

    traverse(treeArray);
    return { directCount, totalTeamSize };
  };

  // 🔥 Filter Logic (All / Direct / Level)
  const filteredData =
    activeTab === "all"
      ? earningsData
      : activeTab === "direct"
        ? earningsData.filter((item) => item.type === "Direct")
        : earningsData.filter((item) => item.type === "Level");

  // 🔥 Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="pb-20 py-3 px-3 text-white font-sans flex justify-center">
      <div className="w-full max-w-md mx-auto relative">

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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Direct Referrals */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={20} className="text-emerald-400" />
              <p className="text-xs text-gray-400">Direct Referrals</p>
            </div>
            <p className="text-3xl font-bold">
              {loading ? "..." : directReferrals}
            </p>
            <p className="text-emerald-400 text-sm mt-1">Active Users</p>
          </div>

          {/* Team Size */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Network size={20} className="text-blue-400" />
              <p className="text-xs text-gray-400">Team Size</p>
            </div>
            <p className="text-3xl font-bold">
              {loading ? "..." : teamSize}
            </p>
            <p className="text-blue-400 text-sm mt-1">Total Network</p>
          </div>
        </div>

        {/* Referral Earnings History */}
        <div className="space-y-4 border border-[#444385] rounded-lg px-4 py-5 mt-6 bg-[#00000033]">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold">Referral Earnings History</h2>
            <button
              onClick={() => navigate("/settings/referral-earning-history")}
              className="text-xs text-[#81ECFF] flex items-center gap-1"
            >
              See More →
            </button>
          </div>

          {/* TABS */}
          <div className="flex bg-[#1B2028] border border-[#444B55] rounded-full p-1 mb-5">
            {["all", "direct", "level"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-2.5 text-sm rounded-full transition ${activeTab === tab
                    ? "bg-gradient-to-r from-[#587FFF] to-[#09239F] text-white"
                    : "text-gray-400"
                  }`}
              >
                {tab === "all" ? "All" : tab === "direct" ? "Direct" : "Level"}
              </button>
            ))}
          </div>

          {/* TABLE */}
          <div className="rounded-lg border border-[#81ECFF66] p-[1px] bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">
            <div className="rounded-lg bg-[#0B0F1A] backdrop-blur-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full text-sm">
                  <thead className="bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)] uppercase">
                    <tr className="text-[#FFFFFF] border-b border-[#1f2430]">
                      <th className="px-4 py-3 text-left">S.No</th>
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-center">Amount</th>
                      <th className="px-4 py-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-400">
                          Loading data...
                        </td>
                      </tr>
                    ) : currentData.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-400">
                          No records found
                        </td>
                      </tr>
                    ) : (
                      currentData.map((item, i) => (
                        <tr
                          key={i}
                          className="border-b border-[#1f2430] hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]"
                        >
                          <td className="px-4 py-3 text-blue-400 font-medium">
                            {indexOfFirst + i + 1}
                          </td>
                          <td className="px-4 py-3">{item.id}</td>
                          <td className="px-4 py-3 font-medium">{item.name}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                item.type === "Direct"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-green-500/20 text-green-300"
                              }`}
                            >
                              {item.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-[#81ECFF]">
                            +{item.amount}
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-gray-400">
                            {item.date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#1B2028] rounded-lg disabled:opacity-50"
              >
                ← Prev
              </button>
              <span className="px-4 py-2 text-sm">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#1B2028] rounded-lg disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Main Image Section with Overlay */}
        <div className="relative mt-6">
          <img
            src={btmimg}
            alt="No Referrals"
            className="w-full rounded-3xl"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">No Referrals Yet</h2>
              <p className="text-gray-300 text-[14px] leading-relaxed max-w-[330px]">
                Start sharing your referral code to earn commission on every trade your friends make.
              </p>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-10">
              <button
                className="w-full font-semibold text-md py-3 rounded-xl shadow-xl active:scale-95 transition-all text-white"
                style={{
                  background: 'linear-gradient(45deg, #587FFF 0%, #09239F 100%)'
                }}
                onClick={() => {
                  // You can add share logic here same as Profile page
                  toast.success("Invite link copied! 🚀");
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