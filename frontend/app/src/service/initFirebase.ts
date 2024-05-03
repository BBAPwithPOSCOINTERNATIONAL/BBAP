import { initializeApp, FirebaseApp } from "firebase/app";
import { getToken, getMessaging, Messaging  } from "firebase/messaging";
// import { sendTokenToServer } from "../api/fcmTokenAPI.tsx";


// TODO: 로그인할 때마다 실행되도록 수정 필요함
const {
  VITE_FB_API_KEY: apiKey,
  VITE_FB_AUTH_DOMAIN: authDomain,
  VITE_FB_PROJECT_ID: projectId,
  VITE_FB_STORAGE_BUCKET: storageBucket,
  VITE_FB_MESSAGING_SENDER_ID: messagingSenderId,
  VITE_FB_APP_ID: appId,
  VITE_FB_MEASUREMENT_ID: measurementId,
  VITE_VAPID_KEY: vapidKey,
} = import.meta.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

const messaging: Messaging = getMessaging(app);

export async function requestPermission(): Promise<string | null> {
  try {
    const permission: NotificationPermission = await Notification.requestPermission();
    if (permission === "granted") {
      const token: string | null = await getToken(messaging, { vapidKey });
      if (token) {
        console.log(token);
        // sendTokenToServer(token); // 토큰을 서버로 전송하는 로직 활성화
        return token;
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
      );
    }
    return null;
  } catch (error: any) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
    return null;
  }
}


requestPermission();
