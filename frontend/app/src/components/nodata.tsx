import sadimg from "/assets/images/sad.png";

function Nodata() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={sadimg} alt="슬퍼하는 이미지" className="h-40 w-40 my-10" />
      <div className="font-hyemin-bold text-2xl">데이터가 없어요</div>
    </div>
  );
}

export default Nodata;
