/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/header";
import Button from "../../components/button";
import * as faceapi from "face-api.js";
import { payInfoByFace } from "../../api/paymentApi";

const PaymentFacePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [warningMsg, setWarningMsg] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      console.log("Models loaded");
    };

    let stream: MediaStream | null = null;

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error("Failed to get video stream", err);
        });
    };

    loadModels().then(startVideo);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop(); // 각 트랙을 중지합니다.
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const detection = useCallback(async () => {
    if (!videoRef.current || videoRef.current.paused || videoRef.current.ended)
      return;
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();
    if (detections.length > 0) {
      captureImage();
      return;
    }
    requestAnimationFrame(detection);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("play", detection);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", detection);
      }
    };
  }, [detection]);

  const retryDetection = () => {
    setWarningMsg("");
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        detection(); // Restart the detection process
      });
    }
  };

	const sendImageDataToServer = async (file: File) => {
		try {
			const response = await payInfoByFace(file);
			navigate("/payment-final", { state: response.data });
		} catch (err) {
			setRetryCount(prevCount => prevCount + 1); // 에러 발생 시 재시도 횟수만 증가
		}
	};

	useEffect(() => {
		if (retryCount > 0 && retryCount < 10) {
			detection(); // 재시도 함수 호출
		} else if (retryCount >= 10) {
			setWarningMsg("등록되지 않은 사원입니다");
			setRetryCount(0); // 재시도 횟수 초기화
		}
	}, [retryCount]);

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context && videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert data URL to file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured.jpg", { type: "image/jpg" });
          sendImageDataToServer(file);
        } else {
          console.error("Failed to convert canvas data to Blob");
        }
      }, "image/png");
    }
  };

  return (
    <>
      <Header text="결제하기" className="" />
      <div id="body" className="my-6">
        <div className="text-center text-2xl my-12">
          가이드라인 안쪽으로 <br />
          얼굴을 위치시켜주세요
        </div>
        <div
          id="frame"
          className="border border-2 border-primary-color rounded-2xl w-[500px] h-[500px] px-10 mx-auto relative"
          style={{
            boxShadow: "15px 15px 5px lightgray",
            overflow: "hidden",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
            <img src="assets/images/guideLine.png" alt="" className="w-2/3" />
          </div>
          <video
            ref={videoRef}
            autoPlay
            muted
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scaleX(-1)",
            }}
          />
          <div ref={canvasRef} />
        </div>
        {warningMsg && (
          <div>
            <p className="text-xl text-red-500 font-bold text-center mt-10 mb-5">
              {warningMsg}
            </p>
            <div
              className="bg-red-500 text-white rounded-full text-lg w-1/4 py-5 mx-auto text-center"
              onClick={() => {
                retryDetection();
              }}
            >
              재시도
            </div>
          </div>
        )}
      </div>
      <div className="w-full absolute bottom-[70px] text-center">
        <Button
          className="bg-bg-color text-white text-xl w-1/3 py-4"
          text="이전으로"
          onClick={() => {
            navigate("/payment");
          }}
        />
      </div>
    </>
  );
};

export default PaymentFacePage;
