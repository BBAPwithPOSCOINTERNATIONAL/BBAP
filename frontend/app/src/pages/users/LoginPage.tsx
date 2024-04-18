import React, { useState, FormEvent } from "react";
import logoimg from "../../assets/logo.png";

function LoginPage() {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login Attempted with:", employeeId, password);
  };

  return (
    <div
      style={{ backgroundColor: "#035381", color: "white", padding: "20px" }}
    >
      <img src={logoimg} alt="Login Logo" />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1>BBAP</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="employeeId">사원번호:</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
