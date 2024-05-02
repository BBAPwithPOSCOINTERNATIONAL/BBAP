import React from "react";
import { Notice } from "../api/notificationAPI";
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

interface NoticeProps {
	noticeData: Notice;
	handleDelete: (noticeId: number) => void;
}
const NoticeItem: React.FC<NoticeProps> = ({ noticeData, handleDelete }) => {
	const imgSrc: { [key: string]: string } = {
		결제: "src/assets/notification/payment.png",
		카페주문: "src/assets/notification/cafe.png",
		함께주문: "src/assets/notification/game.png",
		영수증: "src/assets/notification/receipt.png",
	};
	const urlText: { [key: string]: string } = {
		결제: "결제내역 보러가기",
		함께주문: "함께주문 보러가기",
		영수증: "사용내역 보러가기",
	};

	const trailingActions = (noticeId: number) => (
		<TrailingActions>
			<SwipeAction destructive={true} onClick={() => handleDelete(noticeId)}>
				<div className="h-full text-red-500 text-lg font-bold text-end my-auto mx-5 flex items-center">
					삭제
				</div>
			</SwipeAction>
		</TrailingActions>
	);

	const originalDate = new Date(noticeData.noticeDate);
	const formattedDate = `${originalDate.toLocaleDateString()} ${originalDate.toLocaleTimeString(
		[],
		{ hour: "2-digit", minute: "2-digit" }
	)}`;
	return (
		<SwipeableList>
			<SwipeableListItem trailingActions={trailingActions(noticeData.noticeId)}>
				<div className="border border-gray-500 rounded rounded-lg mx-2 my-1 shadow shadow-lg p-2 w-full">
					<div className="flex justify-between text-sm">
						<p>{noticeData.noticeClassification}</p>
						<p>{formattedDate}</p>
					</div>
					<div className="flex items-center">
						<img
							src={imgSrc[noticeData.noticeClassification]}
							alt={imgSrc[noticeData.noticeClassification]}
							className="w-10 h-10 m-2"
						/>
						<div>
							<p className="font-bold">
								{noticeData.noticeClassification === "결제"
									? `${noticeData.storeName} ${noticeData.noticeText}`
									: noticeData.noticeText}
							</p>
							{noticeData.noticeClassification !== "카페주문" && (
								<p className="text-sm text-sky-600 font-bold">
									<a
										href={noticeData.noticeUrl}
										onClick={() => handleDelete(noticeData.noticeId)}
									>
										{urlText[noticeData.noticeClassification]} &gt;
									</a>
								</p>
							)}
						</div>
					</div>
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
};

export default NoticeItem;
