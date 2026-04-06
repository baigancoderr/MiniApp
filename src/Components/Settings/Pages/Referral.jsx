import React, { useState, useEffect } from "react";
import btmimg from "../../../assets/btmimg.png";
import { ArrowLeft, Users, User, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";

const Referral = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [directReferrals, setDirectReferrals] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/team-tree-view");

        if (res.data.status === "success") {
          const tree = res.data.data.tree || [];

          const stats = calculateTeamStats(tree);
          setDirectReferrals(stats.directCount);
          setTeamSize(stats.totalTeamSize);

          const flattened = flattenTreeForTable(tree);
          setTableData(flattened);
        } else {
          throw new Error(res.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load referral data");
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  const calculateTeamStats = (treeArray) => {
    let directCount = 0;
    let totalTeamSize = 0;

    const traverse = (nodes) => {
      nodes.forEach((node) => {
        if (node.level > 0) {
          totalTeamSize += 1;
          if (node.level === 1) directCount += 1;
        }
        if (node.children?.length) traverse(node.children);
      });
    };

    traverse(treeArray || []);
    return { directCount, totalTeamSize };
  };

  const flattenTreeForTable = (treeArray) => {
    const result = [];

    const traverse = (nodes) => {
      nodes.forEach((node) => {
        if (node.level > 0) {
          result.push({
            id: node.userId || node.referralCode || "N/A",
            name: node.name?.trim() || node.username || "Unknown",
            level: node.level,
            selfInvestment: node.selfInvestment || 0,
            date: "12 Mar 2026",
          });
        }
        if (node.children?.length) traverse(node.children);
      });
    };

    traverse(treeArray || []);
    return result;
  };

  // ✅ PAGINATION SETTINGS (5 RECORDS ONLY)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentData = tableData.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="pb-20 py-3 px-3 text-white flex justify-center">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <button onClick={() => navigate("/settings")}
            className="p-2 rounded-lg bg-[#00000033] border border-[#444385]">
            <ArrowLeft size={18} />
          </button>

          <h2 className="text-lg font-semibold">Referral</h2>

          <div className="w-10 h-10 flex items-center justify-center rounded-xl 
            bg-gradient-to-r from-[#587FFF] to-[#09239F]">
            <User size={18} />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl px-4 py-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-emerald-400" />
              <p className="text-xs text-gray-400">Direct Referrals</p>
            </div>
            <p className="text-3xl font-bold">{loading ? "..." : directReferrals}</p>
          </div>

          <div className="bg-white/10 rounded-xl px-4 py-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Network size={18} className="text-blue-400" />
              <p className="text-xs text-gray-400">Team Size</p>
            </div>
            <p className="text-3xl font-bold">{loading ? "..." : teamSize}</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-6 border border-[#444385] rounded-lg p-4 bg-[#00000033]">

          <h2 className="text-md font-semibold mb-4">Referral Network</h2>

          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm">

              <thead>
                <tr className="border-b border-[#1f2430] text-left">
                  <th className="py-2">S.No</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th className="text-center">Investment</th>
                  <th className="text-right">Date</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-6">Loading...</td></tr>
                ) : currentData.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-6">No Data</td></tr>
                ) : (
                  currentData.map((item, i) => (
                    <tr key={i} className="border-b border-[#1f2430]">
                      <td className="py-2 text-blue-400">
                        {indexOfFirst + i + 1}
                      </td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>Level {item.level}</td>
                      <td className="text-center text-[#81ECFF]">
                        {item.selfInvestment}
                      </td>
                      <td className="text-right text-xs text-gray-400">
                        {item.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          {/* PAGINATION (same style as second component) */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-5">

              <p className="text-xs text-gray-400">
                Page <span className="text-white">{currentPage}</span> of {totalPages}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border rounded disabled:opacity-40"
                >
                  ⏮
                </button>

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border rounded disabled:opacity-40"
                >
                  ←
                </button>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border rounded disabled:opacity-40"
                >
                  →
                </button>

                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border rounded disabled:opacity-40"
                >
                  ⏭
                </button>

              </div>
            </div>
          )}

        </div>

        {/* BOTTOM IMAGE */}
        <div className="relative mt-8">
          <img src={btmimg} className="w-full rounded-3xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold">No Referrals Yet</h2>
            <p className="text-sm text-gray-300">
              Start sharing your referral code
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Referral;