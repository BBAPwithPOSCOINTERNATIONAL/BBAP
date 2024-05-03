import { initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";
// import { sendTokenToServer } from "../api/fcmTokenAPI.tsx";

// TODO: 로그인할 때마다 실행되도록 수정 필요함
const apiKey = import.meta.env.VITE_FB_API_KEY;
const authDomain = import.meta.env.VITE_FB_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FB_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FB_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FB_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FB_APP_ID;
const measurementId = import.meta.env.VITE_FB_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

export const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const vapidKey = import.meta.env.VITE_VAPID_KEY;

export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey,
      });
      if (token) {
        console.log(token);
        // sendTokenToServer(token); // (토큰을 서버로 전송하는 로직)
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}

requestPermission();
