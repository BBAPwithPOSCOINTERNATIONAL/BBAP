import { useState, useEffect } from "react";
import { fetchSubsidyDetails, Subsidy } from "../../api/hradminAPI";
import { useUserStore } from "../../store/userStore";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const [subsidyData, setSubsidyData] = useState<Subsidy[]>([]);
  const workplaceId = useUserStore((state) => state.workplace?.workplaceId);

  useEffect(() => {
    if (workplaceId) {
      fetchSubsidyDetails(workplaceId)
        .then((response) => setSubsidyData(response.data.subsidyList))
        .catch((error) =>
          console.error("Failed to fetch subsidy details:", error)
        );
    }
  }, [workplaceId]);

  const getMealTime = (mealClassification: number): string => {
    const mealTimes: { [key: number]: string } = {
      1: "아침",
      2: "점심",
      3: "저녁",
    };
    return mealTimes[mealClassification] || "Unknown";
  };

  const formatTime = (time: string) => {
    return time.substr(0, 8);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="p-7 rounded-lg bg-slate-100" >
        <h2 className="text-xl font-hyemin-bold mb-4 text-center">
          나의 지원금
        </h2>
        <table className="w-full font-hyemin-bold text-center text-sm">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-gray-500 px-3 py-2">구분</th>
              <th className="border border-gray-500 px-0 py-2">적용시간</th>
              <th className="border border-gray-500 px-1 py-2">지원금액</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#E2F1FF" }}>
            {subsidyData.length > 0 ? (
              subsidyData.map((subsidy, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 px-4 py-2">
                    {getMealTime(subsidy.mealClassification)}
                  </td>
                  <td className="border border-gray-500 px-2 py-2">
                    {formatTime(subsidy.startTime)} ~{" "}
                    {formatTime(subsidy.endTime)}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {subsidy.subsidy.toLocaleString()} 원
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
