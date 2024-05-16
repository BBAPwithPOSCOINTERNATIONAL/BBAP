import { useEffect, useRef, useState } from "react";
// import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../../components/Navbar";
import { useRoomStore } from "../../../store/roomStore.tsx";
import { OrderEmployee, Room } from "../../../api/useWebSocket.tsx";
import { useUserStore } from "../../../store/userStore.tsx";
import { useNavigate } from "react-router";
import jackpot from "/assets/images/jackpot.png";

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
    "#FFB6C1", // 연한 분홍색
    "#FFDAB9", // 연한 살구색
    "#ADD8E6", // 연한 하늘색
    "#90EE90", // 연한 연두색
    "#FFA07A", // 연한 살색
    "#FFC0CB", // 연한 분홍색
    "#98FB98", // 연한 연두색
    "#87CEFA", // 연한 하늘색
    "#FFE4C4", // 연한 오렌지색
    "#F0FFF0", // 연한 밝은 녹색
    "#D8BFD8", // 연한 라벤더색
  ];

  useEffect(() => {
    const loadFontAndDraw = async () => {
      const font = new FontFace(
        "Hyemin-Bold",
        "url(/assets/fonts/IM_Hyemin-Bold.woff2)"
      );
      await font.load();
      document.fonts.add(font);

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

          // Draw border
          ctx.beginPath();
          ctx.arc(cw, ch, cw - 2, 0, Math.PI * 2);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#333"; // 테두리 색상 지정
          ctx.stroke();

          // Draw labels
          ctx.fillStyle = "black";
          ctx.font = "18px 'Hyemin-Bold'";
          ctx.textAlign = "center";

          orderers.forEach((orderer, i) => {
            const angle = arc * i + arc / 2;
            ctx.save();
            ctx.translate(
              cw + Math.cos(angle) * (cw - 50),
              ch + Math.sin(angle) * (ch - 50)
            );
            ctx.rotate(angle + Math.PI / 2);
            ctx.fillText(orderer.empName, 0, 0);
            ctx.restore();
          });

          // Draw center dot
          ctx.beginPath();
          ctx.arc(cw, ch, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#A56134";
          ctx.fill();
        }
      }
    };

    loadFontAndDraw();
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
      <h1 className="font-hyemin-bold text-4xl my-8">{rouletteText}</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width="330"
          height="330"
          className="transition duration-3000 my-5"
        ></canvas>
        <img
          src={jackpot}
          alt="jackpot"
          className="absolute top-[5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8"
        />
      </div>
      <div className="font-hyemin-bold my-5 text-2xl">
        총 주문 인원 : {orderers.length}
      </div>
      {room.currentOrderer.empId === empId &&
        room.roomStatus === "GAME_START" && (
          <button
            onClick={runWheel}
            className="w-3/5 mt-4 bg-primary-color text-white font-hyemin-bold p-3 text-2xl rounded transition duration-200 active:bg-gray-700 active:text-white cursor-pointer"
          >
            룰렛 돌리기
          </button>
        )}
    </div>
  );
};
export default RoulettePage;
