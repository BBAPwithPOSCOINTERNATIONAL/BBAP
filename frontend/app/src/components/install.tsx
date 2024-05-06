import { useEffect, useState } from "react";
// import bbapimg from "/assets/images/bbap.png";
import logoimg from "/assets/images/logo.png";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 설치를 눌렀습니다.");
        } else {
          console.log("사용자가 설치를 취소했습니다.");
        }
// 설치해도 이미지 보여야하쟈나
        // setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="mx-auto mb-5 w-36 h-36 shadow-lg bg-indigo-50 rounded-full">
      {deferredPrompt && (
        <button onClick={handleInstallClick}>
          {" "}
          <img
            src={logoimg}
            alt="Login Logo"
             />
        </button>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
