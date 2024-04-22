import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface AdminNavProps {
  adminId: string;
}

const LeftNav = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: #035381;
`;

const AdminNav: React.FC<AdminNavProps> = ({ adminId }) => {
  const [activeTab, setActiveTab] = useState<"조회" | "결재">("조회");
  const history = useNavigate();

  const handleTabClick = (tab: "조회" | "결재") => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    // 로그아웃 처리
    history("/admin"); // 로그인 페이지로 이동
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <LeftNav>
        <div>
          <button
            className=" font-hyemin-bold text-[25px] bg-[#80c481] text-white p-4 px-20 rounded-lg m-5"
            onClick={() => handleTabClick("조회")}
          >
            조회
          </button>
          <button
            className=" font-hyemin-bold text-[25px] bg-[#80c481] text-white p-4 px-20 rounded-lg m-5"
            onClick={() => handleTabClick("결재")}
          >
            결재
          </button>
        </div>
        <div className=" font-hyemin-bold text-white">
          관리자 사번: {adminId}
          <button
            className=" font-hyemin-bold text-[25px] bg-[#80c481] text-white p-4 px-20 rounded-lg m-5"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </LeftNav>
      <div>
        {activeTab === "조회" && <div>조회 탭 내용</div>}
        {activeTab === "결재" && <div>결재 탭 내용</div>}
      </div>
    </div>
  );
};

export default AdminNav;
