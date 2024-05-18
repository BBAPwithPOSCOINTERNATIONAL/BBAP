import NavBar from "../../../components/Navbar";
import { useRoomStore } from "../../../store/roomStore.tsx";
import { useEffect, useState } from "react";
import { Employee } from "../../../store/roomStore.tsx";
import { Room } from "../../../api/useWebSocket.tsx";
import { useNavigate } from "react-router";
// import {Room} from "../../../api/useWebSocket.tsx";

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
    }, 5000);

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
      <NavBar goBack={goBack} />
      <div className="flex flex-col items-center justify-center font-hyemin-bold">
        <h1 className="mt-2 mx-1 ml-2 bg-primary-color text-xl text-white border rounded-md p-1 w-11/12 text-center flex justify-center items-center">
          {currentCafe?.name}
        </h1>
        <div className="text-center text-3xl mt-4">사줄 사람</div>
        <p className="text-center text-3xl my-4">
          {` ${penaltyWinner?.empName}님입니다!`}
        </p>
        <div className="text-center text-3xl mt-4">맛있게 먹을사람</div>
        {nonWinners.map((item) => (
          <div key={item.empNo} className="text-center text-3xl">
            {item.empName} 님
          </div>
        ))}
        <button
          className="mt-32 w-1/2 bg-primary-color text-white font-bold py-2 px-4 rounded"
          onClick={() => setGameResultDisplay(1)}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default WinnerPage;
