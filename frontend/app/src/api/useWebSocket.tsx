import {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client'
import {useUserStore} from "../store/userStore.tsx";


type Message = {
  body: string;
};


type Room = {
  roomId: string;
  cafeId: string;
  roomStatus: string;
  currentOrderer: number;
  orderers: Record<number, string> | null; // nullable
  orderItems: OrderItem[] | null; // nullable
  orderNumber: number | null; // nullable
};

type OrderItem = {
  orderItemId: string;
  menuId: string;
  cnt: number;
  options: MenuOption[];
  orderer: number;
};


type OrderItemPayload = Pick<OrderItem, 'menuId' | 'cnt' | 'options'>;


type MenuOption = {
  optionName: string;
  type: string;
  required: boolean;
  choiceOptions: ChoiceOption[];
};

type ChoiceOption = {
  choiceName: string;
  price: number;
};

type StompHook = {
  room: Room | null;
  disconnectFromRoom: () => void;
  deleteOrderItem: (orderItemId: string) => void;
  addOrderItem: (orderItem: OrderItemPayload) => void;
  startGame: () => void;
  runWheel: () => void;
};


const useWebSocket = (url: string, roomId: string | undefined): StompHook => {
  const [client, setClient] = useState<Client | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const empId = useUserStore((state) => state.empId);

  useEffect(() => {
    if (!roomId) {
      return
    }

    const socket = new SockJS(url);
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });


    stompClient.onConnect = () => {
      console.log('Connected to room ' + roomId);
      stompClient.subscribe(`/topic/room/${roomId}`, messageOutput);
      stompClient.publish({
        destination: `/app/connect/${roomId}/${empId}`, // empId
      });
    };

    stompClient.onStompError = frame => {
      console.log(
        'Broker reported error: ' + frame.headers['message'] + ' - ' + frame.body
      );
    };

    setClient(stompClient);
    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        disconnectFromRoom();
      }
    };
  }, [roomId]);


  const messageOutput = ({body}: Message) => {
    // 주문방 Topic 에서는 주문방 데이터가 지속적으로 들어옴. 타입변환 후 state 저장
    const parsedRoom: Room = JSON.parse(body);
    console.log(parsedRoom);
    setRoom(parsedRoom);
  };

  const disconnectFromRoom = () => {
    if (client) {
      client.publish({
        destination: `/app/leave-room`,
      });
      client.deactivate();

      console.log('연결 종료');
    }
  };


  const deleteOrderItem = (orderItemId: string) => {
    if (client?.connected) {
      client.publish({
        destination: `/app/delete-order-item/${orderItemId}`,
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const addOrderItem = (orderItem: OrderItemPayload) => {
    if (client?.connected) {
      client.publish({
        destination: '/app/add-order-item',
        body: JSON.stringify(orderItem),
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const startGame = () => {
    if (client?.connected) {
      client.publish({
        destination: `/app/start-game`,
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const runWheel = () => {
    if (client?.connected) {
      client.publish({
        destination: `/app/run-wheel`,
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }


  return {
    room,
    disconnectFromRoom,
    deleteOrderItem,
    addOrderItem,
    startGame,
    runWheel
  };
};

export default useWebSocket;
