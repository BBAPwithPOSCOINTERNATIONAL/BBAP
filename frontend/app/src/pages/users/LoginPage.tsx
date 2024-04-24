import React, { useState, FormEvent } from "react";
import logoimg from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login Attempted with:", employeeId, password);
    navigate("/main");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-primary-color text-white p-5">
      <div className="w-full max-w-xs">
        <img src={logoimg} alt="Login Logo" className="mx-auto mb-6" />
        <h1 className="text-center text-5xl font-hyemin-bold mb-6">BBAP</h1>
        <form onSubmit={handleLogin} className="px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="사원번호"
              className="font-hyemin-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="font-hyemin-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
