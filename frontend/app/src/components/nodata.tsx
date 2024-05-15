import React from "react";
import sadimg from "/assets/images/sad.png";

interface NodataProps {
  content: string;
}

const Nodata: React.FC<NodataProps> = ({ content }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <img src={sadimg} alt="슬퍼하는 이미지" className="h-40 w-40 my-10" />
      <div className="font-hyemin-bold text-2xl">{content} 없어요</div>
    </div>
  );
};

export default Nodata;
