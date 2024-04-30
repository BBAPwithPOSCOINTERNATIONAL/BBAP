import { useParams } from "react-router-dom";
import NavBar from "../../../components/Navbar";

function WinnerPage() {
  const { winner } = useParams(); // useParams를 사용하여 winner 파라미터를 가져옵니다.

  const eatMan = ["박영진", "조혜원"];

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center font-hyemin-bold">
        <h1 className="text-center mb-4 font-hyemin-bold">
          카페이름 들어올자리
        </h1>
        <p className="text-center text-3xl my-4">
          <div className="text-center text-3xl mt-4">사줄 사람</div>
          {` ${winner}님(사번)입니다!`}
        </p>
        <div className="text-center text-3xl mt-4">맛있게 먹을사람</div>
        {eatMan.map((item, index) => (
          <div key={index} className="text-center text-3xl">
            {item} 님
          </div>
        ))}
        <button className="mt-32 w-1/2 bg-primary-color text-white font-bold py-2 px-4 rounded">
          확인
        </button>
      </div>
    </>
  );
}

export default WinnerPage;
