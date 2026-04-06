'use client';
import React, { useState, useEffect } from "react";
import { ArrowLeft, User, ChevronDown, ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";

const ReferralTeamTree = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/team-tree-view");
        if (res.data.status === "success") {
          setTreeData(res.data.data.tree || []);
        } else {
          throw new Error(res.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load team tree");
        setTreeData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  // Recursive Tree Node Component
  const TreeNode = ({ node, level = 0 }) => {
    const [expanded, setExpanded] = useState(level < 2); // Expand first 2 levels by default

    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="ml-6 border-l border-[#444385] pl-6 py-1 relative">
        <div className="flex items-center gap-3 py-2 group">
          {/* Toggle Button */}
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-400 hover:text-white transition"
            >
              {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          )}

          {/* Node Card */}
          <div className="flex-1 bg-[#0F1625] border border-[#444385] rounded-xl p-4 hover:border-blue-500 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#587FFF] to-[#09239F] flex items-center justify-center">
                <User size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{node.name || node.username || "Unknown"}</p>
                <p className="text-xs text-gray-400">ID: {node.userId || node.referralCode || "N/A"}</p>
              </div>
              <div className="text-right">
                <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                  Level {node.level}
                </span>
                {node.selfInvestment && (
                  <p className="text-[#81ECFF] text-sm mt-1 font-bold">
                    ₹{node.selfInvestment}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <div className="mt-2">
            {node.children.map((child, index) => (
              <TreeNode key={index} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-20 px-3">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 py-5">
          <button
            onClick={() => navigate("/settings")}
            className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Team Tree View</h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading beautiful tree...</div>
        ) : treeData.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No team members found</div>
        ) : (
          <div className="space-y-4">
            {treeData.map((node, index) => (
              <TreeNode key={index} node={node} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          Tap on arrow to expand levels • Built with love for your network
        </div>
      </div>
    </div>
  );
};

export default ReferralTeamTree;