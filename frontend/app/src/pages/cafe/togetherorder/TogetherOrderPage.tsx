import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import NavBar from "../../../components/Navbar";
import game from "/assets/images/game.png";
import share from "/assets/images/share.png";
import GameModal from "../../../components/cafe/GameModal";
import { useParams } from "react-router-dom";
import useWebSocket, { Room } from "../../../api/useWebSocket.tsx";
import { getCafeList, SelectedCafe, CafeMenus } from "../../../api/cafeAPI";
import { CafeNameInfo } from "../../../components/cafe/CafeNameInfo.tsx";
import { useRoomStore } from "../../../store/roomStore.tsx";
import { useUserStore } from "../../../store/userStore.tsx";

import { MenuOption } from "../../../api/useWebSocket.tsx";
import RoulettePage from "./RoulettePage.tsx";
import WinnerPage from "./WinnerPage.tsx";
import Nodata from "../../../components/nodata.tsx";

const { VITE_WEBSOCKET_URL: websocketURL } = import.meta.env;

interface Product {
  owner: boolean;
  orderItemId: string;
  name: string;
  menuname: string;
  optionsString: string[];
  options: MenuOption[];
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
  options: MenuOption[];
  price: number;
  cnt: number;
  menuId: string;
  deleteOrderItem: (orderId: string) => void;
  room: Room;
}

const ProductCard: React.FC<ProductCardProps> = ({
  owner,
  orderItemId,
  name,
  menuname,
  optionsString,
  price,
  deleteOrderItem,
  room,
}) => {
  return (
    <div className="m-3 mt-3 font-hyemin-bold rounded overflow-hidden shadow-lg bg-[#EFF7FF] flex flex-col">
      <div className="pl-3 pr-3 py-3 pb-2 flex justify-between items-center">
        <div className="font-bold text-xl mb-2">{name} 님</div>
        {owner &&
          (room?.roomStatus === "INITIAL" ||
            room?.roomStatus === "ORDER_FILLED") && (
            <button
              className="text-base border border-gray-400 px-2 rounded-md mb-2"
              onClick={() => deleteOrderItem(orderItemId)}
            >
              삭제
            </button>
          )}
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <div className="px-3">{menuname}</div>
          <div className="font-hyemin-regular text-sm ml-3 mb-2">
            {optionsString.map((option, index) => (
              <span key={index} className="inline-block mr-1">
                {option}
              </span>
            ))}
          </div>
        </div>

        <span className="inline-block rounded-full py-1 mb-2 min-w-[90px] pr-3 text-end font-hyemin-bold">
          {price}원
        </span>
      </div>
    </div>
  );
};

interface ProductListProps {
  products: Product[];
  deleteOrderItem: (orderId: string) => void;
  room: Room;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  deleteOrderItem,
  room,
}) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <Nodata content="주문이" />
      ) : (
        products.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            deleteOrderItem={deleteOrderItem}
            room={room}
          />
        ))
      )}
    </div>
  );
};

function TogetherOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameResultDisplay, setGameResultDisplay] = useState<number>(1);

  // TODO 1. 나가기 버튼 눌렀을 때 처리 (방장이면 알림창 추가)
  // TODO 2. product 비어 있는 경우 텅 처리
  // TODO 3. 공유 눌렀을 때 알림창

  const empId = useUserStore((state) => state.empId);
  const { roomId } = useParams();

  const { room, deleteOrderItem, disconnectFromRoom, startGame, runWheel } =
    useWebSocket(websocketURL, roomId);

  const {
    currentCafe,
    currentCafeMenuList,
    products,
    setCafe,
    setCafeMenus,
    setProducts,
  } = useRoomStore();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // 로그인되지 않은 경우 로그인 페이지로 리디렉션하고 현재 경로를 상태로 전달
      navigate("/", { state: { from: location } });
      return;
    }

    if (room == null) {
      return;
    }

    if (room.roomStatus === "GAME_START") {
      setGameResultDisplay(2);
    }

    if (room.cafeId === currentCafe?.id) {
      return;
    }

    const setJoinedCafe = async (cafeId: string) => {
      const cafeResponse = await getCafeList(cafeId);
      const cafeList = cafeResponse.data.cafeList;

      const joinedCafe = cafeList.find((cafe) => cafe.id === cafeId);
      const selectedCafe: SelectedCafe = cafeResponse.data.selectedCafe;

      console.log(cafeId);
      console.log(joinedCafe);
      const cafeMenus: CafeMenus = {
        menuListCoffee: selectedCafe.menuListCoffee,
        menuListBeverage: selectedCafe.menuListBeverage,
        menuListDesert: selectedCafe.menuListDesert,
      };

      setCafeMenus(cafeMenus);

      if (joinedCafe) {
        setCafe(joinedCafe);
      }
    };

    setJoinedCafe(room.cafeId);
  }, [room]);

  useEffect(() => {
    if (room == null || !room?.orderItems || !currentCafeMenuList) {
      setProducts([]);
      return;
    }

    // 모든 메뉴 아이템을 하나의 배열로 합칩니다.
    const allMenuItems = [
      ...currentCafeMenuList.menuListCoffee,
      ...currentCafeMenuList.menuListBeverage,
      ...currentCafeMenuList.menuListDesert,
    ];

    const products = room.orderItems.map((item) => {
      const menu = allMenuItems.find((m) => m.id === item.menuId) || {
        name: "",
        price: 0,
        options: [],
      };

      const cnt = item.cnt;
      const orderItemId = item.orderItemId;
      const owner = item.orderer === empId;
      const name = room.orderers ? room.orderers[item.orderer].name : "";
      const menuname = menu.name;
      const choiceOptions = item.options
        ? item.options.flatMap((option) => option.choiceOptions || [])
        : [];
      const options = item.options || [];
      const optionsString = choiceOptions.map((choice) => choice.choiceName);

      const price =
        (menu.price + choiceOptions.reduce((sum, ch) => sum + ch.price, 0)) *
        item.cnt;
      const menuId = item.menuId;

      return {
        cnt,
        owner,
        orderItemId,
        name,
        menuname,
        optionsString,
        options,
        price,
        menuId,
        choiceOptions,
      };
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

    if ((room?.orderers ? Object.keys(room.orderers).length : 0) >= 2) {
      startGame();
    } else {
      alert("주문자가 2명 이상일 때만 게임을 시작할 수 있습니다.");
    }
  };

  const navigateToMenus = () => {
    navigate(`/together/${roomId}/menus`);
  };

  const navigateOrderPage = () => {
    if (products.length > 0) {
      navigate(`/together/${roomId}/order`);
    } else {
      // TODO 다른 UI 필요한가
      alert("주문목록이 없습니다.");
    }
  };

  const handleExitRoom = () => {
    disconnectFromRoom();
    navigate("/main");
  };
  room?.roomStatus;

  const handleCopy = () => {
    const input = inputRef.current;
    if (input) {
      navigator.clipboard
        .writeText(input.value)
        .then(() => {
          console.log("Text copied to clipboard");
          alert("클립보드에 복사되었습니다.");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  // 총 주문 가격 계산
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  if (room !== null && room.roomStatus === "ORDERED") {
    return (
      <>
        <div
          className="container bg-[#4786C1] text-white rounded font-hyemin-bold"
          style={{ height: "100vh" }}
        >
          <h1 className="text-center text-3xl font-hyemin-bold flex-1 pt-8">
            {currentCafe?.name} 에서
          </h1>
          <div className="my-4 text-center text-xl">
            <p>함께주문하기가 완료된 방입니다.</p>
          </div>
          <section
            className="bg-white m-2 p-4 text-black text-center rounded"
            style={{ height: "61vh", width: "90vw", marginLeft: "5vw" }}
          >
            <div className=" flex flex-col justify-space-between">
              <p className="text-2xl mb-2">&lt;주문내역&gt;</p>
              {room && room.orderItems && currentCafeMenuList ? (
                <div className=" ">
                  {room.orderItems.map((item, index) => {
                    const menuLists = [
                      ...currentCafeMenuList.menuListCoffee,
                      ...currentCafeMenuList.menuListBeverage,
                      ...currentCafeMenuList.menuListDesert,
                    ];
                    const match = menuLists.find(
                      (menu) => menu.id === item.menuId
                    );
                    return match ? (
                      <p className="text-xl" key={index}>
                        {match.name} X {item.cnt}
                      </p>
                    ) : null;
                  })}{" "}
                </div>
              ) : null}
            </div>
          </section>
          <footer className="fixed bottom-0 w-full">
            <div className="mt-2 text-xl text-white text-center p-2 mb-4">
              총 주문 가격: {totalPrice} 원
            </div>
            <button
              className="w-full bg-primary-color text-white  rounded-md p-2 font-hyemin-bold text-center text-2xl"
              onClick={() => navigate("/main")}
            >
              확인
            </button>
          </footer>
        </div>
      </>
    );
  } else if (
    room !== null &&
    (room.roomStatus === "INITIAL" ||
      room.roomStatus === "GAME_END" ||
      room.roomStatus === "ORDER_FILLED") &&
    gameResultDisplay === 1
  ) {
    return (
      <>
        <NavBar goBack={goBack} />
        <div className="sticky top-[55px] bg-white pb-1">
          <div className="flex items-center">
            {currentCafe && <CafeNameInfo cafe={currentCafe} />}
            <button
              onClick={handleExitRoom}
              className="mt-2 mx-1 mr-2 min-w-[80px] bg-[#00588A] text-white border rounded-md p-1 font-hyemin-bold text-center text-xl"
            >
              나가기
            </button>
          </div>
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              className="mt-2 mx-2 border rounded-md p-1 w-11/12 font-hyemin-bold text-center"
              value={`https://ssafybbap.com/together/${roomId}`}
              readOnly
            />
            <button
              onClick={handleCopy}
              className="flex items-center mt-2 mr-2 min-w-[72px] bg-[#FFF965] border rounded-md p-1 font-hyemin-bold text-center text-base"
            >
              <span>공유</span>
              <img src={share} alt="share icon" className="mx-1 w-6" />
            </button>
          </div>
        </div>
        <div className="main-content pb-36">
          {room && (
            <ProductList
              products={products}
              deleteOrderItem={deleteOrderItem}
              room={room}
            />
          )}
        </div>
        <footer
          id="footer"
          className="fixed bottom-0 left-0 w-full p-2 font-hyemin-bold bg-white shadow-md"
        >
          <div className="flex justify-between items-end">
            <div className="text-base ml-2">
              총 주문 인원:{" "}
              {(room && room.orderers && Object.keys(room.orderers).length) ||
                0}
              명 <br /> 총 주문 가격: {totalPrice} 원
            </div>
            {room &&
              room.currentOrderer.empId === empId &&
              (room?.roomStatus === "INITIAL" ||
                room?.roomStatus === "ORDER_FILLED") && (
                <button onClick={handleOpenModal}>
                  <img src={game} className="mr-2 h-16 mb-0" />
                </button>
              )}
          </div>
          <div className="flex justify-center items-center mt-2">
            {(room?.roomStatus === "INITIAL" ||
              room?.roomStatus === "ORDER_FILLED") && (
              <button
                onClick={navigateToMenus}
                className="min-w-[80px] w-full bg-primary-color text-white border rounded-md p-1 text-center text-2xl mx-1"
              >
                담기
              </button>
            )}
            {room?.currentOrderer.empId === empId && (
              <button
                onClick={navigateOrderPage}
                className="min-w-[80px] w-full bg-[#4786C1] text-white border rounded-md p-1  text-center text-2xl mx-1"
              >
                주문하기
              </button>
            )}
            {room?.currentOrderer.empId !== empId &&
              room?.roomStatus === "GAME_END" && (
                <button
                  disabled={true}
                  className="min-w-[64px] w-full bg-[#d4d4d4] text-black border rounded-md p-1 text-center text-2xl mx-4"
                >
                  결제대기(주문자: {room.currentOrderer.name})
                </button>
              )}
            {room?.currentOrderer.empId !== empId &&
              (room?.roomStatus === "INITIAL" ||
                room.roomStatus === "ORDER_FILLED") && (
                <button
                  disabled={true}
                  className="min-w-[64px] w-full bg-[#d4d4d4] text-black border rounded-md p-2 text-center text-base mx-4"
                >
                  주문자:{room.currentOrderer.name}
                </button>
              )}
          </div>
        </footer>
        <GameModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </>
    );
  } else if (
    room !== null &&
    (room.roomStatus === "GAME_START" || room.roomStatus === "GAME_END") &&
    gameResultDisplay === 2
  ) {
    return (
      <RoulettePage
        room={room}
        setGameResultDisplay={setGameResultDisplay}
        runWheel={runWheel}
        totalPrice={totalPrice}
      />
    );
  } else if (
    room !== null &&
    room?.roomStatus === "GAME_END" &&
    gameResultDisplay === 3
  ) {
    return (
      <WinnerPage setGameResultDisplay={setGameResultDisplay} room={room} />
    );
  }
}

export default TogetherOrderPage;
