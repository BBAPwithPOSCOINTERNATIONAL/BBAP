import React, { useState, FormEvent } from "react";
import logoimg from "/assets/images/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { requestPermission } from "../../service/initFirebase.ts";
import { login, getUserInfo } from "../../api/hradminAPI.js";
import { useUserStore } from "../../store/userStore";

const Inputtag = styled.div`
  margin: 15px;
  width: 480px;
`;

function AdminLoginPage() {
  const [adminId, setAdminId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState("");
  const navigation = useNavigate();
  const updateUserData = useUserStore((state) => state.updateUserData);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminId(() => e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (loading) return;
    if (!adminId || adminId.length !== 7) {
      alert("사원번호는 7자여야 합니다.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);

    try {
      const token = await requestPermission();
      setFcmToken(token ?? "");

      const response = await login(adminId, password, fcmToken);
      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        const userInfo = await getUserInfo();
        // console.log("userinfo", userInfo.data);
        updateUserData(userInfo.data);
        navigation("/admininquiry");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setLoading(false);
    }
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
            required
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
            required
            style={{ paddingLeft: "0" }}
          />
        </Inputtag>
        <button
          type="submit"
          disabled={loading}
          className=" font-hyemin-bold text-[25px] bg-[#80c481] text-white p-3 px-12 rounded-lg m-5"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
