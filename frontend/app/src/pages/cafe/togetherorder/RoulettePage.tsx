import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/Navbar";

type Name = string[];

const RoulettePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const navigate = useNavigate();
  const [rouletteText, setRouletteText] = useState("돌려 돌려 돌림판"); // 기본 텍스트 설정

  const teamNames: Name = [
    "박영진",
    "조혜원",
    "이시은",
    "강성은",
    "이성완",
    "김다희",
  ];

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
        const arc = Math.PI / (teamNames.length / 2);

        // Draw sectors
        teamNames.forEach((_, i) => {
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

        teamNames.forEach((name, i) => {
          const angle = arc * i + arc / 2;
          ctx.save();
          ctx.translate(
            cw + Math.cos(angle) * (cw - 50),
            ch + Math.sin(angle) * (ch - 50)
          );
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(name, 0, 0);
          ctx.restore();
        });
      }
    }
  }, []);

  const rotate = () => {
    console.log(winner);
    const canvas = canvasRef.current;
    if (canvas) {
      const randomIndex = Math.floor(Math.random() * teamNames.length);
      const arc = 360 / teamNames.length;
      const rotateDeg = randomIndex * arc + 3600 + arc * 3 - arc / 4;
      canvas.style.transition = "transform 2s";
      canvas.style.transform = `rotate(-${rotateDeg}deg)`;
      setRouletteText("누가 누가 걸릴까");

      setTimeout(() => {
        const selectedWinner = teamNames[randomIndex];
        setWinner(selectedWinner);

        // 상태 업데이트 후 네비게이션 실행
        setTimeout(() => {
          navigate(`/winner/${selectedWinner}`);
        }, 100);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full overflow-hidden">
      <NavBar />
      <h1 className="font-hyemin-bold text-4xl my-4">{rouletteText}</h1>
      <canvas
        ref={canvasRef}
        width="380"
        height="380"
        className="transition duration-3000 my-5"
      ></canvas>
      <div className="font-hyemin-bold">총 주문 인원 : {teamNames.length}</div>
      <button
        onClick={rotate}
        className="w-1/2 mt-4 bg-primary-color text-white font-hyemin-bold p-3 text-lg font-bold rounded transition duration-200 active:bg-gray-700 active:text-white cursor-pointer"
      >
        룰렛 돌리기
      </button>
    </div>
  );
};

export default RoulettePage;
