import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  deleteAllNotificationData,
  deleteNotificationData,
} from "../api/notificationAPI";
import NoticeItem from "../components/NoticeItem";
import useNoticeStore from "../store/noticeStore";

/* 
알림종류

1. 결제 -> 카페, 식당에서 사원증 태그로 결제 시 알림
2. 카페 제조 완료 -> 주문한 메뉴가 준비되면 알림
3. 함께주문 -> 내가 들어간 주문 방에서 게임이 시작될 때, 결제자로 선택되었을 때, 주문이 되었을 때 알림
4. 영수증 -> 한달의 끝에 알림
*/

const NotificationPage: React.FC = () => {
  const { noticeList, deleteNotice, deleteAllNotices } = useNoticeStore();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleDeleteAllNotification = async () => {
    await deleteAllNotificationData();
    deleteAllNotices();
  };

  const handleDeleteNotification = async (noticeId: number) => {
    await deleteNotificationData(noticeId);
    deleteNotice(noticeId);
  };

  return (
    <>
      <div id="header" className="flex mt-2">
        <button onClick={goBack} className="absolute p-1">
          <FiArrowLeftCircle className="text-4xl cursor-pointer text-primary-color" />
        </button>
        <p className="text-3xl font-bold mx-auto">알림</p>
      </div>
      <div className="flex justify-end">
        <button
          className="border border-2 border-black rounded-lg w-24 text-center font-bold mx-3 p-1"
          onClick={handleDeleteAllNotification}
        >
          모두 지우기
        </button>
      </div>
      <div id="body">
        {/* {isLoading && <p>로딩중...</p>}
				{isError && <p>데이터 요청 실패</p>} */}
        {noticeList?.map((notice, index) => (
          <NoticeItem
            key={index}
            noticeData={notice}
            handleDelete={handleDeleteNotification}
          />
        ))}
      </div>
    </>
  );
};

export default NotificationPage;
