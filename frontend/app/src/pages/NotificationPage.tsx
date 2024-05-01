import React, { useState, useEffect } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
	deleteAllNotificationData,
	deleteNotificationData,
	fetchNotificationData,
	Notice,
} from "../api/notificationAPI";
import NoticeItem from "../components/NoticeItem";

/* 
알림종류

1. 결제 -> 카페, 식당에서 사원증 태그로 결제 시 알림
2. 카페 제조 완료 -> 주문한 메뉴가 준비되면 알림
3. 함께주문 -> 내가 들어간 주문 방에서 게임이 시작될 때, 결제자로 선택되었을 때, 주문이 되었을 때 알림
4. 영수증 -> 한달의 끝에 알림
*/
const dummyNoticeList: Notice[] = [
	{
		noticeId: 1,
		noticeClassification: "payment_restaurant",
		noticeText: "결제가 완료되었습니다",
		noticeUrl: "url1",
		storeName: "A 구내식당(송도)",
		noticeDate: "2024.05.01",
	},
	{
		noticeId: 2,
		noticeClassification: "payment_cafe",
		noticeText: "결제가 완료되었습니다",
		noticeUrl: "url1",
		storeName: "A 카페(송도)",
		noticeDate: "2024.05.01",
	},
	{
		noticeId: 3,
		noticeClassification: "ready_cafe",
		noticeText: "주문하신 메뉴가 준비되었습니다",
		noticeUrl: "",
		storeName: "A 카페(송도)",
		noticeDate: "2024.05.01",
	},
	{
		noticeId: 4,
		noticeClassification: "game_start",
		noticeText: "게임이 시작되었습니다",
		noticeUrl: "url1",
		storeName: "함께주문",
		noticeDate: "2024.05.01",
	},
	{
		noticeId: 5,
		noticeClassification: "game_done",
		noticeText: "결제자로 선택되었습니다",
		noticeUrl: "url1",
		storeName: "함께주문",
		noticeDate: "2024.05.01",
	},
	{
		noticeId: 6,
		noticeClassification: "together",
		noticeText: "주문이 완료되었습니다",
		noticeUrl: "url1",
		storeName: "A 카페(송도)",
		noticeDate: "2024.05.01",
	},
	{
		noticeId: 6,
		noticeClassification: "receipt",
		noticeText: "이번 달 사용내역을 확인해보세요",
		noticeUrl: "url1",
		storeName: "영수증",
		noticeDate: "2024.04.30",
	},
];

const NotificationPage: React.FC = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	const [noticeList, setNoticeList] = useState<Notice[] | undefined>();

	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["notificationData"],
		queryFn: fetchNotificationData,
	});

	useEffect(() => {
		if (response) {
			setNoticeList(response.data.noticeList);
		} else {
			// 더미 데이터 사용
			setNoticeList(dummyNoticeList);
		}
	}, [response]);

	const handleDeleteAllNotification = async () => {
		const response = await deleteAllNotificationData();
		setNoticeList(response?.data.noticeList);
	};

	const handleDeleteNotification = async (noticeId: number) => {
		const response = await deleteNotificationData(noticeId);
		setNoticeList(response?.data.noticeList);
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
