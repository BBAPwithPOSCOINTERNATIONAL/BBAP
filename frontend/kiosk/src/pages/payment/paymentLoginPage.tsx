import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/header.js";
import Button from "../../components/button.js";
import CustomKeyboard from "../../components/customKeyboard.js";
import { payInfoByLogin } from "../../api/paymentApi.js";

const PaymentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [focusId, setFocusId] = useState<string>("");
  const [keyboardVisibility, setKeyboardVisibility] = useState(false);
  const [warningMsg, setWarningMsg] = useState<string>("");

  const handleLogin = async () => {
    if (idNumber && password) {
      console.log({ idNumber, password });
      try {
        const response = await payInfoByLogin({
          empNo: parseInt(idNumber),
          password: password,
        });
        navigate("/payment-final", { state: response.data });
      } catch (error: any) {
        setKeyboardVisibility(false);
        // 서버 에러 메시지를 활용하거나 기본 메시지 표시
        const errMsg =
          error.response?.data?.message || "등록되지 않은 사원입니다";
        setWarningMsg(errMsg);
      }
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setFocusId(id);
    setKeyboardVisibility(true);
  };

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { id } = event.target as HTMLDivElement;
    if (id === "outer" && keyboardVisibility) {
      setKeyboardVisibility(false);
      setFocusId("");
    }
  };

  return (
    <>
      <Header text="결제하기" className="" />
      <div id="body" onClick={handleOutsideClick}>
        <div
          id="outer"
          className="flex flex-col space-y-10 font-bold text-lg text-primary-color py-16 h-[80vh]"
        >
          <div id="outer" className="flex flex-col space-y-5 items-center">
            <label htmlFor="id-number">사원번호</label>
            <input
              type="text"
              id="id-number"
              className={`outline-none border focus:border-4 border-primary-color bg-slate-200 rounded-2xl text-lg p-3 text-center ${
                focusId === "id-number" && "border-4"
              }`}
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div id="outer" className="flex flex-col space-y-5 items-center">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              className={`outline-none border focus:border-4 border-primary-color bg-slate-200 rounded-2xl text-lg p-3 text-center ${
                focusId === "password" && "border-4"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          {warningMsg && (
            <p className="text-xl text-red-500 font-bold text-center my-10">
              {warningMsg}
            </p>
          )}
        </div>
        <div className="w-full absolute bottom-[70px] flex flex-col space-y-5 items-center">
          <Button
            className={`${
              idNumber && password ? "bg-primary-color" : "bg-inactive-color"
            } text-white text-xl w-1/3 py-4`}
            text="다음"
            onClick={() => {
              handleLogin();
            }}
          />
          <Button
            className="bg-bg-color text-white text-xl w-1/3 py-4"
            text="이전으로"
            onClick={() => {
              navigate("/payment");
            }}
          />
        </div>
      </div>

      {keyboardVisibility && (
        <div className="w-full absolute bottom-[320px] flex justify-center z-50">
          <CustomKeyboard
            setInput={focusId == "id-number" ? setIdNumber : setPassword}
          />
        </div>
      )}
    </>
  );
};

export default PaymentLoginPage;
