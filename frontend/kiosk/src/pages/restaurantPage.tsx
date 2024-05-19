import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Button from "../components/button";
import styled, { keyframes } from "styled-components";
import { paymentRestaurantReq } from "../api/paymentApi";
import useModalStore from "../store/modalStore";

// 키보드입력 한영 전환
const koreanKeys = "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ";
const englishKeys = "qwertyuiopasdfghjklzxcvbnm";

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkingText = styled.p`
  animation: ${blinkAnimation} 2s infinite;
`;

const RestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { openConfirmModal, closeConfirmModal, isConfirmModalOpen } =
    useModalStore();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      console.log("Input is focused");
    }
  });

  const activeEnter = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("Enter key is pressed."); // 엔터 키가 눌렸는지 확인
      e.preventDefault();
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
        const response = await paymentRestaurantReq(result);
        console.log("Server response: ", response);
        const confirmMessage = <div>결제가 완료되었습니다!</div>;
        openConfirmModal(confirmMessage);
      } catch (error) {
        console.error("식당 결제 오류:", error);
      }
    }
  };

  return (
    <>
      <div id="body" className="text-center">
        <p className="text-3xl font-bold mt-16">구내식당</p>
        <img
          src="/assets/images/구내식당.png"
          alt="순대국밥 사진"
          className="w-3/4 mx-auto my-20"
        />
        <p className="text-xl">(뚝)돼지갈비찜</p>
        <p className="text-xl">8,500 원</p>
        <BlinkingText className="text-lg text-red-500 my-10">
          사원증을 태그하세요
        </BlinkingText>

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

        <div className="w-full absolute bottom-[70px] text-center">
          <Button
            className="bg-bg-color text-white text-xl w-1/3 py-4"
            text="처음으로"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
            <p className="text-3xl font-semibold text-center">
              결제가 완료되었습니다!
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={closeConfirmModal}
                className="bg-primary-color hover:bg-blue-700 text-white font-bold text-2xl py-4 px-8 rounded focus:outline-none focus:shadow-outline"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantPage;
