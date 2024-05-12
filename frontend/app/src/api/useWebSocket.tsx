import {useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client'
import {useUserStore} from "../store/userStore.tsx";

import {OptionChoice} from "./cafeAPI.tsx";

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


export type OrderItemPayload = Pick<OrderItem, 'menuId' | 'cnt' | 'options'>;


export type MenuOption = {
  optionName: string;
  type: string;
  required: boolean;
  choiceOptions: OptionChoice[];
};


export type OrderRequestDto = {
  cafeId: string;
  usedSubsidy: number;
  pickUpTime: Date;
  menuList: OrderItemPayload[];
  cntCouponToUse: number;
}



const useWebSocket = (url: string, roomId: string | undefined): {
  disconnectFromRoom: () => void;
  deleteOrderItem: (orderItemId: string) => void;
  disconnectSession: () => void;
  addOrderItem: (orderItem: OrderItemPayload) => void;
  startGame: () => void;
  room: Room | null;
  runWheel: () => void;
  order: (requestDto: OrderRequestDto) => void
} => {
  // const [client, setClient] = useState<Client | null>(null);
  const client = useRef<Client | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const empId = useUserStore((state) => state.empId);

  useEffect(() => {
    const socket = new SockJS(url);
    client.current = new Client({
      webSocketFactory: () => socket,
    });


    client.current.onConnect = () => {
      console.log('Connected to room ' + roomId);
      client.current?.subscribe(`/topic/room/${roomId}`, messageOutput);
      client.current?.publish({
        destination: `/app/connect/${roomId}/${empId}`, // empId
      });
    };

    // client.current?.onStompError = frame => {
    //   console.log(
    //     'Broker reported error: ' + frame.headers['message'] + ' - ' + frame.body
    //   );
    // };


    client.current?.activate()

    return () => {
      if (client.current?.connected) {
        client.current?.deactivate();
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
      client.current?.publish({
        destination: `/app/leave-room`,
      });
      client.current?.deactivate();

      console.log('연결 종료');
    }
  };

  const disconnectSession = () => {
    console.log('세션 종료 수행')
    client.current?.deactivate()
  }


  const deleteOrderItem = (orderItemId: string) => {
    if (client.current?.connected) {
      client.current?.publish({
        destination: `/app/delete-order-item/${orderItemId}`,
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const addOrderItem = (orderItem: OrderItemPayload) => {
    if (client.current?.connected) {
      client.current?.publish({
        destination: '/app/add-order-item',
        body: JSON.stringify(orderItem),
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const startGame = () => {
    if (client.current?.connected) {
      client.current?.publish({
        destination: `/app/start-game`,
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const runWheel = () => {
    if (client?.current?.connected) {
      client.current?.publish({
        destination: `/app/run-wheel`,
      });
    } else {
      console.log('소켓 서버에 연결되지 않았습니다.');
    }
  }

  const order = (requestDto: OrderRequestDto) => {
    if (client?.current?.connected) {
      client.current.publish({
        destination: `/app/order`,
        body: JSON.stringify(requestDto),
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
    runWheel,
    disconnectSession,
    order
  };
};

export default useWebSocket;
