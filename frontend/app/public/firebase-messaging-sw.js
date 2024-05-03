/* eslint-disable no-undef */
// 외부 스크립트 가져오기
importScripts(
	"https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);

// 설치 이벤트 리스너
self.addEventListener("install", function () {
	self.skipWaiting();
});

// 활성화 이벤트 리스너
self.addEventListener("activate", function () {
	console.log("fcm service worker가 실행되었습니다.");
});

// Firebase 구성
const firebaseConfig = {
	apiKey: "AIzaSyAI-uMnE99YoSWBCj4pJ1Plrjo222baxoA",
	projectId: "bbap-4acce",
	messagingSenderId: "363879903132",
	appId: "1:363879903132:web:9f1301206168b24ceea259",
};

// Firebase 초기화
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Messaging 객체 가져오기
const messaging = firebaseApp.messaging();

// 백그라운드 메시지 이벤트 리스너
messaging.onBackgroundMessage((payload) => {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		// icon: payload.notification.icon
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});
