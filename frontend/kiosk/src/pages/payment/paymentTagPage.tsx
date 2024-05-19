import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/header";
import Button from "../../components/button";
import { payInfoByCard } from "../../api/paymentApi";

// 키보드입력 한영 전환
const koreanKeys = "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ";
const englishKeys = "qwertyuiopasdfghjklzxcvbnm";

const PaymentTagPage: React.FC = () => {
  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState<string>("");
  const [warningMsg, setWarningMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const activeEnter = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      let result = "";
      for (const char of tagValue) {
        const idx = koreanKeys.indexOf(char);
        if (idx !== -1) {
          result += englishKeys[idx];
        } else {
          result += char;
        }
      }

      console.log("카드번호: ", result);
      setTagValue("");
      try {
        const response = await payInfoByCard(result);
        console.log(response);
        navigate("/payment-final", { state: response.data });
      } catch (error) {
        setWarningMsg("등록되지 않은 카드입니다");
      }
    }
  };

  return (
    <>
      <Header text="결제하기" className="" />
      <div id="body">
        <input
          ref={inputRef}
          type="text"
          id="tag-value"
          style={{ imeMode: "inactive" }}
          className="absolute top-[-9999px] w-2"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          onKeyDown={(e) => {
            activeEnter(e);
          }}
        />
        <div className="flex space-x-20 mt-16 justify-center">
          <div
            className={`border ${
              warningMsg
                ? "border-8 border-red-500"
                : "border-2 border-primary-color"
            } bg-[#E2F1FF] rounded-2xl w-[600px] h-[750px] px-10`}
            style={{
              boxShadow: "15px 15px 5px lightgray",
            }}
          >
            <img
              src="assets/images/사원증태그동작.gif"
              alt=""
              className="h-2/3 my-6 mx-auto z-50"
            />
            <p className="text-center text-xl text-primary-color font-bold">
              사원증을 키오스크 <br />
              하단에 태그하세요
            </p>
          </div>
        </div>
        {warningMsg && (
          <p className="text-xl text-red-500 font-bold text-center my-10">
            {warningMsg}
          </p>
        )}
        <div className="w-full absolute bottom-[70px] text-center">
          <Button
            className="bg-bg-color text-white text-xl w-1/3 py-4"
            text="이전으로"
            onClick={() => {
              navigate("/payment");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentTagPage;
