import React, {useEffect, useState} from "react";
import together from "/assets/images/together.png";
import CafeSelector from "../../../components/cafe/CafeSelector";
import {Cafe, getCafeList} from "../../../api/cafeAPI";
import {
  checkOrderRoomParticipation,
  createOrderRoom,
} from "../../../api/togetherAPI";
import {useNavigate} from "react-router-dom";

const TogetherCreateRoom = () => {
  const [cafeList, setCafeList] = useState<Cafe[]>([]);
  const [selectedCafeId, setSelectedCafeId] = useState<string>("");
  const [selectedCafeName, setSelectedCafeName] = useState<string>("");
  const navigate = useNavigate();
  const [orderRoomId, setOrderRoomId] = useState<string>('')
  // const [orderRoomInfo, setOrderRoomInfo] = useState<string | null>(null);


  // TODO 기존에 참여한 방이 있을 때 로직이 아직 뭔가 이상함.
  useEffect(() => {
    const fetchOrderRoomInfo = async () => {
      try {
        const response = await checkOrderRoomParticipation();
        if (response.data.roomId) {
          // navigate(`/together/${response.data.roomId}`);
          setOrderRoomId(response.data.roomId)
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

        // 유효한 카페가 있으면 설정, 없으면 첫 번째 카페 설정
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
    try {
      const result = await createOrderRoom(selectedCafeId);
      const roomId = result.data.roomId;
      console.log(`주문방 생성 - 주문방 ID : ${roomId}`)
      navigate(`/together/${roomId}`)

    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const navigateToRoom = (roomId: string) => {
    navigate(`/together/${roomId}`)
  }

  return (
    <>
      <CafeSelector
        cafeList={cafeList}
        selectedCafeId={selectedCafeId}
        handleCafeSelect={handleCafeSelect}
      />
      <div className="mt-2 flex flex-col items-center">
        <div className="bg-light-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center">
          <h2 className="m-8 text-4xl">우리같이 주문 할래 ?</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img src={together} alt="together" style={{width: "80%"}}/>
          </div>

          <hr className="h-1 bg-white m-2 mx-auto w-11/12"/>
          <p className="m-4 text-2xl">
            각자 원하는 메뉴를 담아두면 한꺼번에 주문할 수 있어요!!
          </p>
        </div>

        <button
          className="bg-primary-color text-white py-2 px-4 rounded hover:bg-primary-dark mt-4 font-hyemin-bold w-11/12"
          onClick={handleCreateRoom}
        >
          새로운 주문방 만들기
        </button>
        {orderRoomId !== '' && (
          <button
            className="bg-primary-color text-white py-2 px-4 rounded hover:bg-primary-dark mt-4 font-hyemin-bold w-11/12"
            onClick={() => navigateToRoom(orderRoomId)}
          >
            참여중인 방 들어가기
          </button>
        )}
      </div>
    </>
  );
};

export default TogetherCreateRoom;
