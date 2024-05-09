import { useEffect } from 'react';
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./initFirebase";
import { fetchNotificationData } from "../api/notificationAPI";
import useNoticeStore from '../store/noticeStore';
import { useQuery } from "@tanstack/react-query";

function NotificationListener() {
    const { setNoticeList } = useNoticeStore();
    const customNotificationContainer = document.getElementById("custom-notification-container");
    const {
        data: response,
        // isLoading,
        // isError,
    } = useQuery({
        queryKey: ["notificationData"],
        queryFn: fetchNotificationData,
    });

    useEffect(() => {
        if (response) {
            const reversedData = [...response.data.noticeList].reverse();
            setNoticeList(reversedData);
        }
    }, [response]);

    useEffect(() => {
        const messaging = getMessaging(app);

        const unsubscribe = onMessage(messaging, async (payload) => {
            console.log("알림 도착 ", payload);
            const notificationTitle = payload.data?.title;
            const notificationBody = payload.data?.body;

            if (Notification.permission === "granted") {
                // Create a custom notification div
                const customNotification = document.createElement("div");
                customNotification.classList.add("custom-notification");
                customNotification.innerHTML = `
                    <h3>${notificationTitle}</h3>
                    <p>${notificationBody}</p>
                `;

                // Append the custom notification to the container
                customNotificationContainer?.appendChild(customNotification);

                const response = await fetchNotificationData();
                const reversedData = [...response.data.noticeList].reverse();
                setNoticeList(reversedData);

                setTimeout(() => {
                    customNotification.remove();
                }, 3000);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return null;  // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}

export default NotificationListener;
