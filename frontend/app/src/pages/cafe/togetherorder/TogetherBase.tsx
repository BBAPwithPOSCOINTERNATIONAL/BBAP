import together from "/assets/images/together.png";
// import {createOrderRoom} from "../../../api/togetherAPI.tsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCafeList, Cafe} from "../../../api/cafeAPI";
import {createOrderRoom} from "../../../api/togetherAPI.tsx";

export const TogetherBase = () => {

  const navigate = useNavigate();
  const [cafeList, setCafeList] = useState<Cafe[]>([]);
  const [selectedCafeId, setSelectedCafeId] = useState<string>("");

  // 처음 마운트 될 때 한 번만 카페 목록을 불러옵니다.
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
      } catch (error) {
        console.error("Error fetching cafe list:", error);
      }
    }

    loadCafes();
  }, []);

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

  const handleCafeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCafeId(e.target.value);
    localStorage.setItem("cafeId", e.target.value);
  };


  return (
    <>
      <div className="mt-2 flex flex-col items-center">
        <div className="sticky top-[105px] bg-white flex flex-col w-full items-center z-20">
          <select
            id="cafe-select"
            value={selectedCafeId}
            onChange={handleCafeSelect}
            className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center flex justify-center items-center h-9"
          >
            {cafeList.map((cafe) => (
              <option key={cafe.id} value={cafe.id}>
                {cafe.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="bg-light-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center">
          <h2 className="m-8 text-4xl">우리같이 주문 할래 ?</h2>
          <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img src={together} alt="together" style={{width: "80%"}}/>
          </div>

          <hr className="h-1 bg-white m-2 mx-auto w-11/12"/>
          <p className="m-4 text-2xl">각자 원하는 메뉴를 담아두면 한꺼번에 주문할 수 있어요!!</p>
        </div>

        <button
          className="bg-primary-color text-white py-2 px-4 rounded hover:bg-primary-dark mt-4 font-hyemin-bold w-11/12"
          onClick={handleCreateRoom}>
          방 만들러 가기
        </button>
      </div>
    </>
  );
};
