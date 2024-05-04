import { useEffect, useState } from "react";
import bbapimg from "/assets/images/bbap.png";

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

        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      {deferredPrompt && (
        <button onClick={handleInstallClick}>
          {" "}
          <img
            src={bbapimg}
            alt="Login Logo"
            className="mx-auto mb-5 mt-0 w-5/6"
          />
        </button>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
