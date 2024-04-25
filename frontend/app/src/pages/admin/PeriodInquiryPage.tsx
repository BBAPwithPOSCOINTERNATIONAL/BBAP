import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import poscoimg from "../../assets/posco.png";
import EmployeeSubsidy from "../../components/admin/employeesubsidy";
import EmployeeSearch from "../../components/admin/filter";

interface AdminNavProps {
  adminId: number;
}

const today = new Date();
const year = today.getFullYear().toString().slice(-2);
const month = today.getMonth();

const LeftNav = styled.div`
  width: 20rem;
  height: 100vh;
  background-color: #035381;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  // 1024px 이하에서 너비 조정
  @media (max-width: 1024px) {
    width: 16rem; // 화면이 1024px 이하일 때 너비를 25vw로 변경
  }

  // 768px 이하에서 너비 조정
  @media (max-width: 768px) {
    width: 14rem; // 화면이 768px 이하일 때 너비를 33vw로 변경
  }

  // 480px 이하에서 너비 조정
  @media (max-width: 480px) {
    width: 10rem; // 화면이 480px 이하일 때 너비를 50vw로 변경
  }
`;

const RightSide = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
`;
// const Inputtag = styled.input``;

const AdminNav: React.FC<AdminNavProps> = ({ adminId = "1053713" }) => {
  const [activeTab, setActiveTab] = useState<"조회" | "결재">("조회");
  const history = useNavigate();

  const handleTabClick = (tab: "조회" | "결재") => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    // 로그아웃 처리
    history("/admin"); // 로그인 페이지로 이동
  };

  const gotoback = () => {
    history("/admininquiry");
  };

  const handleApprovalClick = () => {
    history("/admininquiry?tab=결재");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LeftNav className="flex-auto">
        <div>
          <button
            className="font-hyemin-bold bg-[#F2F2F2] rounded-md ml-5 mt-24
            p-4 text-[20px] sm:text-[20px] md:text-[22px] lg:text-[25px]
            w-48 sm:w-44 md:w-52 lg:w-full"
            onClick={() => gotoback()}
          >
            조회
          </button>
          <button
            className="font-hyemin-bold bg-[#F2F2F2] rounded-md m-5 
             p-4 text-[20px] sm:text-[20px] md:text-[22px] lg:text-[25px]
             w-44 sm:w-44 md:w-52 lg:w-full"
            onClick={handleApprovalClick}
          >
            결재
          </button>
        </div>
        <div>
          <div className=" font-hyemin-bold text-[18px] text-white">
            관리자 사번: {adminId}
          </div>
          <button
            className=" font-hyemin-bold text-[18px] bg-[#EFF7FF] text-black w-36 p-4 rounded-md m-5"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </LeftNav>
      <RightSide>
        <img src={poscoimg} alt="Login Logo" className="fixed top-3 right-4" />
        {/* 조회 탭 눌렀을 경우 */}
        {activeTab === "조회" && (
          <div
            style={{
              marginLeft: "23rem",
              marginTop: "1%",
            }}
          >
            <div className=" font-hyemin-bold text-[40px] mb-3">조회👀</div>
            <div className=" font-hyemin-bold text-[30px]">기간설정</div>
            <div className=" font-hyemin-bold ">
              <EmployeeSubsidy />
            </div>
            <button
              className="font-hyemin-bold text-[18px] bg-[#163760] text-white w-44 p-4 rounded-md m-5 fixed bottom-0 left-1/2 transform -translate-x-1/2"
              onClick={gotoback}
            >
              목록으로
            </button>
          </div>
        )}
        {/* 결재 탭 눌렀을 경우 */}
        {activeTab === "결재" && (
          <div
            style={{
              marginLeft: "23rem",
              marginTop: "1%",
            }}
          >
            <div className=" font-hyemin-bold text-[40px]">
              {year}년 {month}월 결재📄
            </div>
            <div className=" font-hyemin-bold text-[30px]">사원검색</div>
            <div className=" font-hyemin-bold">탭 내용</div>
          </div>
        )}
      </RightSide>
    </div>
  );
};

export default AdminNav;
