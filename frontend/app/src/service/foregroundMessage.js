import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./initFirebase";

const messaging = getMessaging(app);
const customNotificationContainer = document.getElementById(
	"custom-notification-container"
);

onMessage(messaging, (payload) => {
	console.log("알림 도착 ", payload);
	const notificationTitle = payload.notification.title;
	const notificationBody = payload.notification.body;

	if (Notification.permission === "granted") {
		// Create a custom notification div
		const customNotification = document.createElement("div");
		customNotification.classList.add("custom-notification");
		customNotification.innerHTML = `
            <h3>${notificationTitle}</h3>
            <p>${notificationBody}</p>
        `;

		// Append the custom notification to the container
		customNotificationContainer.appendChild(customNotification);

		setTimeout(() => {
			customNotification.remove();
		}, 2000);
	}
});
