import React, { useState, useCallback, useRef, FormEvent } from "react";
import logoimg from "/assets/images/logo.png";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const Inputtag = styled.div`
  margin: 15px;
  width: 480px;
`;

function AdminLoginPage() {
  const [adminId, setAdminId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigate();

  const adminIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length <= 7) {
      setAdminId(inputValue);
    }
  }, []);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value.trim());
    },
    []
  );

  // const handleLogin = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("Login Attempted with:", adminId, password);
  //   navigation("/admininquiry");
  // };

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (loading) {
        return;
      }
      if (!adminId || !password) {
        alert("사원번호와 비밀번호를 모두 입력해주세요.");
        return;
      }
      setLoading(true);
      try {
        const response = await apiClient.post(`/api/v1/hr/auth/login`, {
          adminId,
          password,
        });
        console.log(response.data);
        alert("로그인 되었습니다.");
        // 세션 또는 로컬 스토리지에 토큰 저장
        localStorage.setItem("accessToken", response.data.data.accessToken);
        navigation("/admininquiry"); // 로그인 성공 후 이동할 경로
      } catch (error) {
        if (error instanceof Error) {
          alert("로그인 실패: " + error.message);
        } else {
          alert("로그인 실패: " + error);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, adminId, password]
  );

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <img
          src={logoimg}
          alt="Login Logo"
          className="mx-auto w-24 h-24 shadow-lg bg-indigo-50 rounded-full"
        />
        <h1 className="text-[70px] font-hyemin-bold">지원금 관리</h1>
      </div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Inputtag>
          <input
            className=" font-hyemin-bold text-[24px] p-0 text-center focus:ring-4 focus:ring-blue-300 focus:outline-none appearance-none w-full text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-2 ring-slate-300 shadow-sm"
            type="text"
            aria-label="Id"
            value={adminId}
            placeholder="사원번호"
            onChange={onChangeId}
            ref={adminIdRef}
            // required
            style={{ marginTop: "20px", paddingLeft: "0" }}
          />
        </Inputtag>
        <Inputtag>
          <input
            className=" font-hyemin-bold text-[24px] p-0 text-center focus:ring-4 focus:ring-blue-300 focus:outline-none appearance-none w-full text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-2 ring-slate-200 shadow-sm"
            type="password"
            aria-label="PW"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
            ref={passwordRef}
            // required
            style={{ paddingLeft: "0" }}
          />
        </Inputtag>
        <button
          type="submit"
          className=" font-hyemin-bold text-[25px] bg-[#80c481] text-white p-3 px-12 rounded-lg m-5"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
