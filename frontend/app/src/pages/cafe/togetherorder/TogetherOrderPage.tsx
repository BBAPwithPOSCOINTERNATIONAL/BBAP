import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../../../components/Navbar";
import CafeSelector from "../../../components/cafe/CafeSelector";
import game from "/assets/images/game.png";
import share from "/assets/images/share.png";
import GameModal from "../../../components/cafe/GameModal";

interface Product {
  owner: boolean;
  name: string;
  menuname: string;
  options: string[]; // options는 문자열 배열로 가정합니다.
  price: number;
}

interface ProductCardProps {
  name: string;
  menuname: string;
  options: string[];
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  menuname,
  options,
  price,
}) => {
  return (
    <div className="m-3 mt-5 font-hyemin-bold rounded overflow-hidden shadow-lg bg-[#EFF7FF] flex flex-col">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name} 님</div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <span className="px-6">{menuname}</span>
          <span className="font-hyemin-regular text-sm">
            {options.map((option, index) => (
              <span key={index} className="inline-block mr-2">
                {option}
              </span>
            ))}
          </span>
        </div>
        <span className="inline-block rounded-full px-3 py-1 mb-2">
          {price} 원
        </span>
      </div>
    </div>
  );
};

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

function TogetherOrderPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/roulette");
  };

  const products: Product[] = [
    {
      owner: true,
      name: "젠킨스",
      menuname: "아메리카노",
      options: ["HOT", "Medium", "Option 3"],
      price: 3000,
    },
    {
      owner: false,
      name: "토로로",
      menuname: "스트로베리 라떼",
      options: ["ICE", "large"],
      price: 5000,
    },
  ];

  const handleCopy = () => {
    const input = inputRef.current;
    if (input) {
      navigator.clipboard
        .writeText(input.value)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center">
        <CafeSelector />
        <button
          onClick={() => navigate(-1)}
          className="mt-2 mr-2 min-w-[64px] bg-[#00588A] text-white border rounded-md p-1 font-hyemin-bold text-center text-base"
        >
          나가기
        </button>
      </div>
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          className="border rounded-md m-2 p-1 w-11/12 font-hyemin-bold text-center"
          placeholder="링크들어올자리"
        ></input>
        <button
          onClick={handleCopy}
          className="flex items-center mr-2 min-w-[85px] bg-[#FFF965] border rounded-md p-1 font-hyemin-bold text-center text-xl"
        >
          <span>공유</span>
          <img src={share} alt="share icon" className="ml-1" />
        </button>
      </div>
      <ProductList products={products} />
      <footer
        id="footer"
        className="fixed bottom-0 left-0 w-full p-4 font-hyemin-bold"
      >
        <div className="flex justify-between items-center">
          <div className="text-xl ml-4">총 주문 인원: {products.length}</div>
          <button onClick={handleOpenModal}>
            <img src={game} className="mr-4"></img>
          </button>
        </div>
        <div className="flex justify-center items-center mt-3">
          <button
            onClick={() => console.log("담기")}
            className="min-w-[64px] w-full bg-primary-color text-white border rounded-md p-1 text-center text-2xl mx-4"
          >
            담기버튼
          </button>
          <button
            onClick={() => console.log("주문")}
            className="min-w-[64px] w-full bg-[#4786C1] text-white border rounded-md p-1  text-center text-2xl mx-4"
          >
            주문하기
          </button>
        </div>
      </footer>
      <GameModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default TogetherOrderPage;
