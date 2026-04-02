import { ArrowLeft, User, Coins, CheckCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const InvestmentHistory = () => {
  const navigate = useNavigate();

  // 🔥 Investment Data (Dummy)
  const investments = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    package: 50 + i * 10,
    tokens: (50 + i * 10) * 1.1,
    daily: (0.05 + i * 0.01).toFixed(3),
    days: Math.floor(Math.random() * 700),
    status: i % 3 === 0 ? "Completed" : "Active",
    time: "07:06 PM",
  }));

  // 🔥 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(investments.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = investments.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen px-3 pb-24 py-3 text-white bg-[#0B0F19]">
      <div className="max-w-md mx-auto space-y-5">

        {/* 🔷 HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">Investment History</h2>
          </div>

          <div
            onClick={() => navigate("/settings/profile")}
            className="w-10 h-10 flex items-center justify-center rounded-xl 
            bg-gradient-to-r from-[#587FFF] to-[#09239F] 
            shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <User size={18} />
          </div>
        </div>

        {/* 🔥 SUMMARY */}
        <div className="rounded-2xl p-4 border border-[#444385] bg-[#00000033]">
          <p className="text-gray-400 text-xs">TOTAL INVESTED</p>
          <h2 className="text-2xl font-bold mt-1">$1,650</h2>
          <p className="text-xs text-gray-400 mt-1">Across all plans</p>
        </div>

        {/* 🔥 LIST */}
        <div className="space-y-4 border border-[#444385] rounded-lg px-2 py-4 bg-[#00000033]">

        <div className="flex justify-between items-center px-1">
    <h3 className="text-lg font-semibold bg-gradient-to-r from-[#587FFF] to-[#09239F] bg-clip-text text-transparent">
      Investment History
    </h3>

    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
      {investments.length} Records
    </span>
  </div>

          {currentData.map((item) => {
            const isActive = item.status === "Active";
            const progress = (item.days / 700) * 100;

            return (
              <div
                key={item.id}
                className="group rounded-2xl border border-[#444385] overflow-hidden hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="bg-[#00000033] p-4 backdrop-blur-[20px]
                group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]
                transition-all duration-300">

                  {/* TOP */}
                  <div className="flex justify-between items-start">

                    <div className="flex items-center gap-3">

                      <div className={`p-1.5 rounded-xl ${
                        isActive ? "bg-blue-500/10" : "bg-green-500/10"
                      }`}>
                        {isActive ? (
                          <Loader size={16} className="text-blue-400 animate-spin" />
                        ) : (
                          <CheckCircle size={16} className="text-green-400" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <Coins size={16} className="text-purple-400" />
                          <span className="text-white text-sm font-semibold">
                            {item.package} USDT
                          </span>
                        </div>

                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                          {item.tokens.toFixed(2)} CPR (+10%)
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-[10px]">
                      <p className="text-gray-400 mb-2">{item.time}</p>
                      <span className={`px-2 py-1  rounded-full text-[10px] ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-cyan-400 text-sm font-medium">
                      {item.daily} CPR / day
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.days} / 700 days
                    </p>
                  </div>

                  {/* PROGRESS */}
                  <div className="w-full h-2 bg-[#111] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#587FFF] to-[#09239F]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* 🔥 PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-5">

            <p className="text-xs text-gray-400">
              Page <span className="text-white">{currentPage}</span> of {totalPages}
            </p>

            <div className="flex gap-2">

              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
              >
                ⏮
              </button>

              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
              >
                ←
              </button>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
              >
                →
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
              >
                ⏭
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InvestmentHistory;
