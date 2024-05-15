import React, { useEffect, useState } from "react";
import together from "/assets/images/together.png";
import CafeSelector from "../../../components/cafe/CafeSelector";
import { Cafe, getCafeList } from "../../../api/cafeAPI";
import {
  checkOrderRoomParticipation,
  createOrderRoom,
} from "../../../api/togetherAPI";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../../../components/cafe/CreateRoomModal"; // 올바른 import 경로 확인

import Pobap from "/assets/images/hello.png";

const TogetherCreateRoom = () => {
  const [cafeList, setCafeList] = useState<Cafe[]>([]);
  const [selectedCafeId, setSelectedCafeId] = useState<string>("");
  const [selectedCafeName, setSelectedCafeName] = useState<string>("");
  const navigate = useNavigate();
  const [orderRoomId, setOrderRoomId] = useState<string>("");
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchOrderRoomInfo = async () => {
      try {
        const response = await checkOrderRoomParticipation();
        if (response.data.roomId) {
          setOrderRoomId(response.data.roomId);
        }
      } catch (error) {
        console.error("Failed to fetch order room info:", error);
      }
    };

    fetchOrderRoomInfo();
  }, [navigate, selectedCafeName]);

  useEffect(() => {
    async function loadCafes() {
      const storedCafeId = localStorage.getItem("cafeId") || "-1";
      try {
        const response = await getCafeList(storedCafeId);
        setCafeList(response.data.cafeList);

        const validCafe = response.data.cafeList.find(
          (cafe) => cafe.id === storedCafeId
        );
        setSelectedCafeId(
          validCafe ? validCafe.id : response.data.cafeList[0]?.id || ""
        );
        setSelectedCafeName(
          validCafe ? validCafe.name : response.data.cafeList[0]?.name || ""
        );
      } catch (error) {
        console.error("Error fetching cafe list:", error);
      }
    }

    loadCafes();
  }, []);

  const handleCafeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCafe = cafeList.find((cafe) => cafe.id === e.target.value);
    setSelectedCafeId(selectedCafe?.id || "");
    setSelectedCafeName(selectedCafe?.name || "");
    localStorage.setItem("cafeId", e.target.value);
    localStorage.setItem("cafeName", e.target.value);
  };

  const handleCreateRoom = async () => {
    if (orderRoomId) {
      setIsModalOpen(true);
    } else {
      createNewRoom();
    }
  };

  const createNewRoom = async () => {
    try {
      setClickedButton("newRoom");
      setIsDoorOpen(true);
      setTimeout(async () => {
        const result = await createOrderRoom(selectedCafeId);
        const roomId = result.data.roomId;
        console.log(`주문방 생성 - 주문방 ID : ${roomId}`);
        navigate(`/together/${roomId}`);
      }, 300);
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const navigateToRoom = (roomId: string) => {
    setClickedButton("existingRoom");
    setIsDoorOpen(true);
    setTimeout(() => {
      navigate(`/together/${roomId}`);
    }, 300);
  };

  return (
    <>
      <style>
        {`
          @keyframes doorOpen {
            from {
              transform: perspective(800px) rotateY(0deg);
            }
            to {
              transform: perspective(800px) rotateY(-90deg);
            }
          }
          .button-door {
            perspective: 1000px;
            transform-style: preserve-3d;
            transition: transform 0.3s;
            transform-origin: left; /* Add this line */
          }
          .button-door.open {
            animation: doorOpen 0.3s forwards;
          }
        `}
      </style>
      <CafeSelector
        cafeList={cafeList}
        selectedCafeId={selectedCafeId}
        handleCafeSelect={handleCafeSelect}
      />
      <div className="mt-3 flex flex-col items-center">
        <div className="bg-light-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center">
          <h2 className="mt-4 text-2xl">같이 주문하실래요?</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img src={together} alt="together" style={{ width: "50%" }} />
          </div>

          <hr className="h-1 bg-white m-2 mx-auto w-11/12" />
          <div className="m-4 text-lg">
            <p>각자 원하는 메뉴를 담아두면</p>
            <p>방장이 한번에 주문할 수 있어요!!</p>
          </div>
        </div>

        <div className="flex px-4 gap-2 w-full flex-grow ">
          <img src={Pobap} className="w-36 fixed top-[70%] left-[7%]" />
          <img src={Pobap} className="w-36 fixed top-[70%] right-[6%]" />
          <button
            className={`${
              orderRoomId ? "bg-gray-300" : "bg-primary-color"
            } text-lg py-2 px-4 rounded hover:bg-primary-dark mt-2 font-hyemin-bold w-1/2 pb-24 button-door ${
              isDoorOpen && clickedButton === "newRoom" ? "open" : ""
            }`}
            onClick={handleCreateRoom}
            // disabled={!!orderRoomId}
          >
            <div className="bg-blue-50 rounded p-2">
              새로운 주문방
              <br />
              들어가기
            </div>
            <span className="relative top-8 left-28 block h-5 w-4 rounded-full bg-yellow-200"></span>
          </button>
          <button
            className={`${
              !orderRoomId ? "bg-gray-300" : "bg-primary-color"
            } text-lg py-2 px-4 rounded hover:bg-primary-dark mt-2 font-hyemin-bold w-1/2 pb-24 button-door ${
              isDoorOpen && clickedButton === "existingRoom" ? "open" : ""
            }`}
            style={{ height: "33vh" }}
            onClick={() => navigateToRoom(orderRoomId)}
            // disabled={!orderRoomId}
          >
            <div className="bg-blue-50 rounded p-2">
              참여중인 방
              <br />
              들어가기
            </div>
            <span className="relative top-8 left-28 block h-5 w-4 rounded-full bg-yellow-200"></span>
          </button>
        </div>
      </div>
      <CreateRoomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={createNewRoom}
      />
    </>
  );
};

export default TogetherCreateRoom;
