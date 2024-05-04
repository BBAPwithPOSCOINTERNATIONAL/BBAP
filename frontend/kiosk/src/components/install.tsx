import { useEffect, useState } from "react";

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
            <button onClick={handleInstallClick}><img
            src="/assets/images/포스코인터내셔널_로고.png"
            alt=""
            className="w-[230px]"
          />
            </button>
          )}
        </div>
      );
    };
    
    export default PWAInstallPrompt;