import React, { useState, FormEvent } from "react";
import logoimg from "../../assets/logo.png";
import styled from "styled-components";

const Inputtag = styled.div`
  margin: 20px;
`;

function AdminLoginPage() {
  const [adminId, setAdminId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login Attempted with:", adminId, password);
  };

  return (
    <div
      style={{ backgroundColor: "#035381", color: "white", padding: "20px" }}
    >
      <img src={logoimg} alt="Login Logo" />
      <h1 className="text-[90px] font-hyemin-bold">지원금 관리</h1>
      <form onSubmit={handleLogin}>
        <Inputtag>
          <input
            className=" font-hyemin-bold focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Id"
            value={adminId}
            placeholder="사원번호"
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </Inputtag>
        <Inputtag>
          <input
            className=" font-hyemin-bold focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="password"
            aria-label="PW"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Inputtag>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
