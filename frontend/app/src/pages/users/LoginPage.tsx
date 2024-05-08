import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import bbapimg from "/assets/images/bbap.png";
// import logoimg from "/assets/images/logo.png";
import PWAInstallPrompt from "../../components/install";
import { requestPermission } from "../../service/initFirebase";
import { login, getUserInfo } from "../../api/hradminAPI";
import { useUserStore } from "../../store/userStore";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fcmToken, setFcmToken] = useState("");
  const updateUserData = useUserStore((state) => state.updateUserData);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(() => e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (loading) return;
    if (!employeeId || employeeId.length !== 7) {
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

      const response = await login(employeeId, password, fcmToken);

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        const userInfo = await getUserInfo();
        // console.log("userinfo", userInfo.data);
        updateUserData(userInfo.data);
        navigate("/main");
      }
    } catch (error) {
      alert("아이디 또는 비밀번호를 확인해주세요.");
      console.error("로그인 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-primary-color text-white p-5">
      <div className="w-full max-w-xs">
        {/* <img
          src={logoimg}
          alt="Login Logo"
          className="mx-auto mb-5 w-36 h-36 shadow-lg bg-indigo-50 rounded-full"
        /> */}
        <PWAInstallPrompt />
        <img
          src={bbapimg}
          alt="Login Logo"
          className="mx-auto mb-5 mt-0 w-5/6"
        />
        {/* <h1 className="text-center text-6xl font-hyemin-bold mb-1">BBAP</h1> */}
        <form onSubmit={onSubmit} className="px-4 pt-6 pb-8 mb-4">
          <div className="mb-8 mt-12">
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={onChangeId}
              required
              placeholder="사원번호"
              className="font-hyemin-bold shadow appearance-none leading-10 border rounded w-full py-4 px-5 text-gray-700 text-center leading-tight focus:outline-none appearance-none ring-2 focus:ring-blue-300 focus:outline-none 
              ring-slate-300 focus:shadow-outline text-[18px] "
            />
          </div>
          <div className="mb-20">
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              required
              autoComplete="off"
              placeholder="비밀번호"
              className="font-hyemin-bold shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 text-center leading-tight ring-2 focus:ring-blue-300 focus:outline-none 
              text-[18px] ring-slate-300 focus:outline-none focus:shadow-outline p-0"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="font-hyemin-bold bg-primary-color shadow-lg hover:bg-blue-200 hover:text-black text-white text-2xl font-bold py-3 px-10 rounded-md focus:outline-none focus:shadow-outline"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
