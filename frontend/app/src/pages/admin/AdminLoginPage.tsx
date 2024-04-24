import React, { useState, FormEvent } from "react";
import logoimg from "../../assets/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Inputtag = styled.div`
  margin: 15px;
  width: 480px;
`;

function AdminLoginPage() {
  const [adminId, setAdminId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login Attempted with:", adminId, password);
  };
  const navigation = useNavigate();

  const goToAdminInquiryPage = () => {
    navigation("/admininquiry");
  };

  return (
    <div
      style={{
        backgroundColor: "#035381",
        color: "white",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <img src={logoimg} alt="Login Logo" style={{ marginTop: "-20px" }} />
        <h1 className="text-[70px] font-hyemin-bold">지원금 관리</h1>
      </div>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Inputtag>
          <input
            className=" font-hyemin-bold text-[25px] focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none w-full text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-2 ring-slate-300 shadow-sm"
            type="text"
            aria-label="Id"
            value={adminId}
            placeholder="사원번호"
            onChange={(e) => setAdminId(e.target.value)}
            required
            style={{ marginTop: "20px" }}
          />
        </Inputtag>
        <Inputtag>
          <input
            className=" font-hyemin-bold text-[25px] focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none w-full text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-2 ring-slate-200 shadow-sm"
            type="password"
            aria-label="PW"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Inputtag>
        <button
          type="submit"
          onClick={goToAdminInquiryPage}
          className=" font-hyemin-bold text-[25px] bg-[#80c481] text-white p-3 px-12 rounded-lg m-5"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
