import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import bbapimg from "/assets/images/bbap.png";
import logoimg from "/assets/images/logo.png";
import { requestPermission } from "../../service/initFirebase";
import { login } from "../../api/hradminAPI";
// import { useUserStore } from "../../store/userStore";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fcmToken, setFcmToken] = useState("");

  const employeeIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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

    const token = await requestPermission();
    setFcmToken(token ?? "");
    try {
      // console.log(adminId, password);
      const response = await login(employeeId, password, fcmToken);
      console.log(response);

      navigate("/main");
    } catch (error) {
      // console.log(adminId, password);
      console.error("로그인 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-primary-color text-white p-5">
      <div className="w-full max-w-xs">
        <img
          src={logoimg}
          alt="Login Logo"
          className="mx-auto mb-5 w-36 h-36 shadow-lg bg-indigo-50 rounded-full"
        />
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
              ref={employeeIdRef}
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
              ref={passwordRef}
              required
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
