import React, { useState, useCallback, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import logoimg from "/assets/images/logo.png";

function LoginPage() {
	const navigate = useNavigate();
	// const [loading, setLoading] = useState<boolean>(false);
	const [employeeId, setEmployeeId] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const employeeIdRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setEmployeeId(e.target.value.trim());
	}, []);

	const onChangePassword = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value.trim());
		},
		[]
	);

	//  const onSubmit = useCallback(
	//    async (event: FormEvent) => {
	//      event.preventDefault();
	//      if (loading) {
	//        return;
	//      }
	//      if (!employeeId || !password) {
	//        alert("사원번호와 비밀번호를 모두 입력해주세요.");
	//        return;
	//      }
	//      setLoading(true);
	//      try {
	//        const response = await axios.post(`${Config.API_URL}/login`, {
	//          employeeId,
	//          password,
	//        });
	//        console.log(response.data);
	//        alert("로그인 되었습니다.");
	//        // 세션 또는 로컬 스토리지에 토큰 저장 예제
	//        sessionStorage.setItem("accessToken", response.data.data.accessToken);
	//        navigate("/main"); // 로그인 성공 후 이동할 경로
	//      } catch (error) {
	//        alert("로그인 실패: " + error.response.data.message);
	//      } finally {
	//        setLoading(false);
	//      }
	//    },
	//    [loading, email, password, navigate]
	//  );

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
							onChange={onChangeId}
							ref={employeeIdRef}
							// required
							placeholder="사원번호"
							className="font-hyemin-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-6">
						<input
							type="password"
							id="password"
							value={password}
							onChange={onChangePassword}
							ref={passwordRef}
							// required
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
