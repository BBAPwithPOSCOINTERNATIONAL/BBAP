import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import NavBar from "../../../components/Navbar";
import game from "/assets/images/game.png";
import share from "/assets/images/share.png";
import GameModal from "../../../components/cafe/GameModal";
import {useParams} from "react-router-dom";
import useWebSocket from "../../../api/useWebSocket.tsx";
import {getCafeList, SelectedCafe, CafeMenus} from "../../../api/cafeAPI";
import {CafeNameInfo} from "../../../components/cafe/CafeNameInfo.tsx";
import {useRoomStore} from "../../../store/roomStore.tsx";
import {useUserStore} from "../../../store/userStore.tsx";

import {MenuOption} from "../../../api/useWebSocket.tsx";

const {VITE_WEBSOCKET_URL: websocketURL} = import.meta.env;


interface Product {
  owner: boolean;
  orderItemId: string;
  name: string;
  menuname: string;
  optionsString: string[];
  options: MenuOption[]
  price: number;
  cnt: number;
  menuId: string;

}

interface ProductCardProps {
  owner: boolean;
  orderItemId: string;
  name: string;
  menuname: string;
  optionsString: string[];
  options: MenuOption[]
  price: number;
  cnt: number
  menuId: string;
  deleteOrderItem: (orderId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                   owner,
                                                   orderItemId,
                                                   name,
                                                   menuname,
                                                   optionsString,
                                                   price,
                                                   deleteOrderItem,
                                                 }) => {
  return (
    <div className="m-3 mt-5 font-hyemin-bold rounded overflow-hidden shadow-lg bg-[#EFF7FF] flex flex-col">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl mb-2">{name} 님</div>
        {owner && (
          <button
            className="text-base"
            onClick={() => deleteOrderItem(orderItemId)}
          >
            삭제
          </button>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <span className="px-6">{menuname}</span>
          <span className="font-hyemin-regular text-sm">
            {optionsString.map((option, index) => (
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
  deleteOrderItem: (orderId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({products, deleteOrderItem}) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} deleteOrderItem={deleteOrderItem}/> // 수정
      ))}
    </div>
  );
};

function TogetherOrderPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // const [products, setProducts] = useState<Product[]>([])


  const empId = useUserStore((state) => state.empId);
  const {roomId} = useParams();

  const {
    room,
    deleteOrderItem
  } = useWebSocket(websocketURL, roomId);

  const {currentCafe, currentCafeMenuList, products, setCafe, setCafeMenus, setProducts} = useRoomStore()


  useEffect(() => {
    if (room == null) {
      return
    }

    if (room.cafeId === currentCafe?.id) {
      return;
    }

    const setJoinedCafe = async (cafeId: string) => {
      const cafeResponse = await getCafeList(cafeId)
      const cafeList = cafeResponse.data.cafeList

      const joinedCafe = cafeList.find(cafe => cafe.id === cafeId);
      const selectedCafe: SelectedCafe = cafeResponse.data.selectedCafe;

      console.log(cafeId)
      console.log(joinedCafe)
      const cafeMenus: CafeMenus = {
        menuListCoffee: selectedCafe.menuListCoffee,
        menuListBeverage: selectedCafe.menuListBeverage,
        menuListDesert: selectedCafe.menuListDesert
      };

      setCafeMenus(cafeMenus)

      if (joinedCafe) {
        setCafe(joinedCafe)
      }
    }

    setJoinedCafe(room.cafeId)

  }, [room]);

  useEffect(() => {
    if (room == null || !room?.orderItems || !currentCafeMenuList) {
      return;
    }

    // 모든 메뉴 아이템을 하나의 배열로 합칩니다.
    const allMenuItems = [
      ...currentCafeMenuList.menuListCoffee,
      ...currentCafeMenuList.menuListBeverage,
      ...currentCafeMenuList.menuListDesert,
    ];

    const products = room.orderItems.map((item) => {
      const menu = allMenuItems.find((m) => m.id === item.menuId) || {name: "", price: 0, options: []};

      const cnt = item.cnt;
      const orderItemId = item.orderItemId;
      const owner = item.orderer === empId;
      const name = room.orderers ? room.orderers[item.orderer] : "";
      const menuname = menu.name;
      const choiceOptions = item.options ? item.options.flatMap((option) => option.choiceOptions || []) : [];
      const options = item.options || [];
      const optionsString = choiceOptions.map(choice => choice.choiceName);

      const price = (menu.price + choiceOptions.reduce((sum, ch) => sum + ch.price, 0)) * item.cnt;
      const menuId = item.menuId;

      return {cnt, owner, orderItemId, name, menuname, optionsString, options, price, menuId, choiceOptions};
    });


    setProducts(products);
  }, [currentCafeMenuList, room?.orderItems, empId]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate(`/together/${roomId}/roulette`);
  };

  const navigateToMenus = () => {
    navigate(`/together/${roomId}/menus`)
  }

  const navigateOrderPage = () => {
    navigate(`/together/${roomId}/order`)
  }

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
      <NavBar/>
      <div className="flex items-center">
        {currentCafe && <CafeNameInfo cafe={currentCafe}/>}
        <button
          onClick={() => console.log('나가기핸들링')}
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
          value={`https://ssafybbap.com/together/${roomId}`}
          readOnly
        />
        <button
          onClick={handleCopy}
          className="flex items-center mr-2 min-w-[85px] bg-[#FFF965] border rounded-md p-1 font-hyemin-bold text-center text-xl"
        >
          <span>공유</span>
          <img src={share} alt="share icon" className="ml-1"/>
        </button>
      </div>
      <ProductList products={products} deleteOrderItem={deleteOrderItem}/>
      <footer
        id="footer"
        className="fixed bottom-0 left-0 w-full p-4 font-hyemin-bold"
      >
        <div className="flex justify-between items-center">

          <div className="text-xl ml-4">총 주문 인원: {room && room.orderers && Object.keys(room.orderers).length || 0}명
          </div>
          {room && room.currentOrderer === empId && (
            <button onClick={handleOpenModal}>
              <img src={game} className="mr-4"/>
            </button>
          )}
        </div>
        <div className="flex justify-center items-center mt-3">
          <button
            onClick={navigateToMenus}
            className="min-w-[64px] w-full bg-primary-color text-white border rounded-md p-1 text-center text-2xl mx-4"
          >
            담기버튼
          </button>
          <button
            onClick={navigateOrderPage}
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
