import { useEffect, useRef, useState } from "react";
// import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../../components/Navbar";
import { useRoomStore } from "../../../store/roomStore.tsx";
import { OrderEmployee, Room } from "../../../api/useWebSocket.tsx";
import { useUserStore } from "../../../store/userStore.tsx";
import { useNavigate } from "react-router";

interface RoulettePageProps {
  setGameResultDisplay: (value: number) => void;
  runWheel: () => void;
  room: Room;
}

const RoulettePage: React.FC<RoulettePageProps> = ({
  setGameResultDisplay,
  runWheel,
  room,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [winner, setWinner] = useState<Employee | null>(null);
  const [rouletteText, setRouletteText] = useState("돌려 돌려 돌림판"); // 기본 텍스트 설정
  // const [orderers, setOrderers] = useState<Employee[]>([]);

  const empId = useUserStore((state) => state.empId);
  const navigate = useNavigate();

  const { orderers, setOrderers } = useRoomStore();

  useEffect(() => {
    if (room?.roomStatus !== "GAME_END" && room?.orderers) {
      const ordererObjs = Object.values<OrderEmployee>(room.orderers).map(
        ({ empNo, name }) => ({
          empNo,
          empName: name,
          isWinner: false,
        })
      );
      setOrderers(ordererObjs);
    }

    if (room?.roomStatus === "GAME_END") {
      rotate();
    }
  }, [room]);

  // const orderers: Name = [
  //   "박영진",
  //   "조혜원",
  //   "이시은",
  //   "강성은",
  //   "이성완",
  //   "김다희",
  // ];

  const colors = [
    "#dc0936",
    "#e6471d",
    "#f7a416",
    "#efe61f",
    "#60b236",
    "#209b6c",
    "#169ed8",
    "#3f297e",
    "#87207b",
    "#be107f",
    "#e7167b",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const cw = canvas.width / 2;
        const ch = canvas.height / 2;
        const arc = Math.PI / (orderers.length / 2);

        // Draw sectors
        orderers.forEach((_, i) => {
          ctx.beginPath();
          ctx.fillStyle = colors[i % colors.length];
          ctx.moveTo(cw, ch);
          ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
          ctx.fill();
        });

        // Draw labels
        ctx.fillStyle = "#fff";
        ctx.font = "18px Pretendard";
        ctx.textAlign = "center";

        orderers.forEach((orderer, i) => {
          // do other stuff...
          const angle = arc * i + arc / 2;
          ctx.save();
          ctx.translate(
            cw + Math.cos(angle) * (cw - 50),
            ch + Math.sin(angle) * (ch - 50)
          );
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(orderer.empName, 0, 0); // change here
          ctx.restore();
        });
      }
    }
  }, [orderers]);

  const rotate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const randomIndex = Math.floor(Math.random() * orderers.length);
      const arc = 360 / orderers.length;
      const rotateDeg = randomIndex * arc + 3600 + arc * 3 - arc / 1.5;
      canvas.style.transition = "transform 2s";
      canvas.style.transform = `rotate(-${rotateDeg}deg)`;
      setRouletteText("누가 누가 걸릴까");

      setTimeout(() => {
        setGameResultDisplay(3);
        // const selectedWinner = orderers[randomIndex];
        // setWinner(selectedWinner);

        // // 상태 업데이트 후 네비게이션 실행
        // setTimeout(() => {
        //   // navigate(`/together/${roomId}/winner`);
        //   setGameResultDisplay(false)
        //
        // }, 1500);
      }, 2000);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center relative w-full overflow-hidden">
      <NavBar goBack={goBack} />
      <h1 className="font-hyemin-bold text-4xl my-4">{rouletteText}</h1>
      <canvas
        ref={canvasRef}
        width="340"
        height="340"
        className="transition duration-3000 my-5"
      ></canvas>
      <div className="font-hyemin-bold">총 주문 인원 : {orderers.length}</div>
      {room.currentOrderer.empId === empId &&
        room.roomStatus === "GAME_START" && (
          <button
            onClick={runWheel}
            className="w-1/2 mt-4 bg-primary-color text-white font-hyemin-bold p-3 text-lg font-bold rounded transition duration-200 active:bg-gray-700 active:text-white cursor-pointer"
          >
            룰렛 돌리기
          </button>
        )}
    </div>
  );
};
export default RoulettePage;
