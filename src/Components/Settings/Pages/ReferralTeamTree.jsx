'use client';
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Tree from "react-d3-tree";
import { ArrowLeft, User } from "lucide-react";
import api from "../../../api/axios"; // Adjust path as per your project structure
import toast from "react-hot-toast";

const ReferralTeamTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const treeContainer = useRef(null);

  // Fetch Actual Team Tree from API
  useEffect(() => {
    const fetchTeamTree = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/team-tree-view");

        if (res.data.status === "success") {
          const apiTree = res.data.data.tree || [];
          
          // Transform API data to react-d3-tree format
          const transformedTree = transformTreeForD3(apiTree);
          setTreeData(transformedTree);
        } else {
          throw new Error(res.data.message || "Failed to fetch team tree");
        }
      } catch (err) {
        console.error("Team tree fetch error:", err);
        toast.error("Failed to load team tree");
        setTreeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamTree();
  }, []);

  // Transform API tree structure to react-d3-tree format
  const transformTreeForD3 = (apiNodes) => {
    if (!apiNodes || apiNodes.length === 0) return [];

    const transformNode = (node) => {
      return {
        name: node.name || node.username || "Unknown",
        attributes: {
          Name: node.name?.trim() || node.username || "Unknown User",
          UserId: node.userId || node.referralCode || "N/A",
          SelfInvestment: node.selfInvestment || 0,
        },
        children: node.children ? node.children.map(transformNode) : [],
      };
    };

    // Usually the root is the first element (you)
    return apiNodes.map(transformNode);
  };

  // Search Filter
  const filteredTreeData = useMemo(() => {
    if (!treeData?.length) return [];
    if (!searchTerm.trim()) return treeData;

    const matchesSearch = (node) =>
      node.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.attributes?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.attributes?.UserId?.toLowerCase().includes(searchTerm.toLowerCase());

    const filterNode = (node) => {
      const filteredChildren = node.children?.map(filterNode).filter(Boolean) || [];
      
      if (matchesSearch(node) || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    };

    return treeData.map(filterNode).filter(Boolean);
  }, [treeData, searchTerm]);

  // Auto-center tree
  useEffect(() => {
    const updateTranslate = () => {
      if (treeContainer.current) {
        const { width, height } = treeContainer.current.getBoundingClientRect();
        setTranslate({ x: width / 2, y: height * 0.15 });
      }
    };

    if (!loading && treeData.length > 0) {
      updateTranslate();
      window.addEventListener("resize", updateTranslate);
      return () => window.removeEventListener("resize", updateTranslate);
    }
  }, [loading, treeData]);

  // Custom Node Renderer
  const renderCustomNode = useCallback(({ nodeDatum, toggleNode }) => {
    const attrs = nodeDatum.attributes || {};
    const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
    const isExpanded = !nodeDatum._collapsed;

    return (
      <g>
        <foreignObject x="-110" y="-70" width="220" height="140" style={{ overflow: "visible" }}>
          <div
            style={{
              backgroundColor: "#0F1625",
              border: "1px solid #444385",
              borderRadius: "14px",
              padding: "12px",
              width: "220px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
              cursor: hasChildren ? "pointer" : "default",
            }}
            onClick={hasChildren ? toggleNode : undefined}
            className="hover:border-blue-500 transition-all duration-200"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#587FFF] to-[#09239F] flex items-center justify-center flex-shrink-0">
                <User size={22} color="#ffffff" />
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: "#fff", margin: 0, fontSize: "15px" }}>
                  {attrs.Name}
                </p>
                <p style={{ color: "#94a3b8", fontSize: "12.5px", margin: "3px 0 0" }}>
                  ID: {attrs.UserId}
                </p>
              </div>
            </div>

            {Number(attrs.SelfInvestment) > 0 && (
              <p
                style={{
                  color: "#81ECFF",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "12px",
                  fontSize: "16px",
                }}
              >
                ₹{Number(attrs.SelfInvestment).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </foreignObject>

        {hasChildren && (
          <text
            x="0"
            y="55"
            textAnchor="middle"
            fontSize="26"
            fill="#60a5fa"
            style={{ cursor: "pointer", userSelect: "none", fontWeight: "bold" }}
            onClick={toggleNode}
          >
            {isExpanded ? "▼" : "▶"}
          </text>
        )}
      </g>
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Team Tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-20 px-3">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 py-6">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Referral Team Tree</h1>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full bg-[#1F2937] border border-[#444385] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tree Container */}
        <div
          ref={treeContainer}
          className="border border-[#444385] rounded-3xl overflow-hidden bg-[#0B0F19] shadow-2xl"
          style={{ height: "72vh", position: "relative" }}
        >
          <style jsx>{`
            .rd3t-link {
              stroke: #ffffff !important;
              stroke-width: 2.5px !important;
              fill: none !important;
              stroke-opacity: 0.85;
            }
          `}</style>

          {filteredTreeData?.length > 0 ? (
            <Tree
              data={filteredTreeData}
              translate={translate}
              orientation="vertical"
              pathFunc="straight"
              collapsible={true}
              zoomable={true}
              draggable={true}
              renderCustomNodeElement={renderCustomNode}
              separation={{ siblings: 2.0, nonSiblings: 2.5 }}
              zoom={0.82}
              initialDepth={3}
              scaleExtent={{ min: 0.3, max: 3.5 }}
              pathClassFunc={() => "rd3t-link"}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              {searchTerm ? "No matching members found" : "No team members found"}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          Drag to move • Scroll/Pinch to zoom • Tap card or arrow to expand/collapse
        </div>
      </div>
    </div>
  );
};

export default ReferralTeamTree;