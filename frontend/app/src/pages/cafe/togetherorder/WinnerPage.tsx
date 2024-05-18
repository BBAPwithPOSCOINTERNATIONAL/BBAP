import NavBar from "../../../components/Navbar";
import { useRoomStore } from "../../../store/roomStore.tsx";
import { useEffect, useState } from "react";
import { Employee } from "../../../store/roomStore.tsx";
import { Room } from "../../../api/useWebSocket.tsx";
import { useNavigate } from "react-router";
// import {Room} from "../../../api/useWebSocket.tsx";
import BuyImg from "/assets/images/buy.png";
import EatImg from "/assets/images/eats.png";

// import PWAInstallPrompt from "../../components/install";
// import {useNavigate, useParams} from "react-router-dom";

interface WinnerPageProps {
  setGameResultDisplay: (value: number) => void;
  room: Room;
}

const WinnerPage: React.FC<WinnerPageProps> = ({
  setGameResultDisplay,
  room,
}) => {
  const [penaltyWinner, setPenaltyWinner] = useState<Employee>();
  const [nonWinners, setNonWinners] = useState<Employee[]>([]);

  const navigate = useNavigate();
  // const {roomId} = useParams();

  const { orderers, setWinner, currentCafe } = useRoomStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameResultDisplay(1);
    }, 50000000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (room?.roomStatus === "GAME_END" && room?.currentOrderer) {
      const winner = orderers.find(
        (orderer) => orderer.empNo === room?.currentOrderer.empNo
      );
      winner && setWinner(winner);
    }
  }, [room]);

  useEffect(() => {
    const penaltyWinner = orderers.find((orderer) => orderer.isWinner);
    const nonWinners = orderers.filter((orderer) => !orderer.isWinner);

    setPenaltyWinner(penaltyWinner);
    setNonWinners(nonWinners);
  }, [orderers]);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
     <div className="min-h-screen flex flex-col">
  <NavBar goBack={goBack} />
    <h1 className="mt-2 mx-1 bg-primary-color text-xl text-white border rounded-md p-1 w-10/11 text-center flex justify-center items-center">
      {currentCafe?.name}
    </h1>
  <div className="flex flex-col items-center justify-center flex-grow font-hyemin-bold">
    <div className="flex bg-amber-50 rounded-lg flex-col items-center justify-center mb-2 w-5/6 border-2"> 
    <div className="text-center text-3xl my-2">기분좋게 사줄 사람</div>
    <img src={BuyImg} alt="사줄사람" className="w-1/3"/>
    <p className="ttext-center text-3xl mb-4 text-blue-700">
      {` ${penaltyWinner?.empName}님`}
    </p>
    </div>
    <div className="flex bg-amber-50 rounded-lg flex-col items-center justify-center border-2 w-5/6 mb-4 pb-2"> 
    <div className="text-center text-3xl mt-4">맛있게 먹을사람</div>
    <img src={EatImg} alt="먹을사람" className="w-1/3"/>

    {nonWinners.map((item) => (
      <div key={item.empNo} className="text-center text-2xl">
        {item.empName} 님
      </div>
    ))}
     </div>
    <button
      className="w-4/5 mt-4 bg-primary-color text-white font-hyemin-bold p-3 text-2xl rounded transition duration-200 active:bg-gray-700 active:text-white cursor-pointer"
      onClick={() => setGameResultDisplay(1)}
    >
      확인
    </button>
  </div>
</div>


    </>
  );
};

export default WinnerPage;
