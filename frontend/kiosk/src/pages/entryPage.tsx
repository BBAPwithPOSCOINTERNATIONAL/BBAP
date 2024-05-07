import React from "react";
import { useNavigate } from "react-router-dom";
import CurrentTime from "../components/currentTime";
import EntryCarousel from "../components/entryCarousel";
import PWAInstallPrompt from '../components/install'

const EntryPage: React.FC = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate("/main");
  };

  return (
    <div className="w-full h-screen bg-primary-color">
      <div id="header" className="flex justify-between px-8 py-6 bg-white">
        {/* <img
          src="/assets/images/포스코인터내셔널_로고.png"
          alt=""
          className="w-[230px]"
        /> */}
        <PWAInstallPrompt />

        <CurrentTime />
      </div>
      <div className="mt-8">
        <EntryCarousel />
      </div>
      <div className="absolute w-full bottom-[50px]">
        <div className="text-sm my-4 text-center text-white">
          <p>언어를 선택하면, 메인 화면으로 넘어갑니다.</p>
          <p>Selecting a language, enter the main screen.</p>
        </div>
        <div className="flex justify-center space-x-24 mx-auto w-2/3">
          <div
            id="button"
            className="flex justify-center items-center rounded-2xl text-lg font-bold text-primary-color bg-white w-[220px] h-28 border border-primary-color border-4 mt-8"
            onClick={handleClick}
          >
            한글
          </div>
          <div
            id="button"
            className="flex justify-center items-center rounded-2xl text-lg font-bold text-primary-color bg-white w-[220px] h-28 border border-primary-color border-4 mt-8"
            onClick={() => {
              alert("준비중인 서비스입니다^_^");
            }}
          >
            English
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
