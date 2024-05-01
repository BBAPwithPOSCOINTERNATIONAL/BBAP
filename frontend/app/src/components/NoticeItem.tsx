import React from "react";
import { deleteNotificationData, Notice } from "../api/notificationAPI";
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
		payment_restaurant: "src/assets/notification/restaurant.png",
		payment_cafe: "src/assets/notification/cafe.png",
		ready_cafe: "src/assets/notification/cafe.png",
		game_start: "src/assets/notification/game.png",
		game_done: "src/assets/notification/game.png",
		together: "src/assets/notification/together.png",
		receipt: "src/assets/notification/receipt.png",
	};
	const urlText: { [key: string]: string } = {
		payment_restaurant: "결제내역 보러가기",
		payment_cafe: "결제내역 보러가기",
		game_start: "게임 보러가기",
		game_done: "게임결과 보러가기",
		together: "주문내역 보러가기",
		receipt: "사용내역 보러가기",
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

	return (
		<SwipeableList>
			<SwipeableListItem trailingActions={trailingActions(noticeData.noticeId)}>
				<div className="border border-gray-500 rounded rounded-lg mx-2 my-1 shadow shadow-lg p-2 w-full">
					<div className="flex justify-between text-sm">
						<p>{noticeData.storeName}</p>
						<p>{noticeData.noticeDate}</p>
					</div>
					<div className="flex items-center">
						<img
							src={imgSrc[noticeData.noticeClassification]}
							alt={imgSrc[noticeData.noticeClassification]}
							className="w-10 h-10 m-2"
						/>
						<div>
							<p className="font-bold">{noticeData.noticeText}</p>
							{noticeData.noticeClassification !== "ready_cafe" && (
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
