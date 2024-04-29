const Modal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className=" p-7 rounded-lg" style={{ backgroundColor: "#E2F1FF" }}>
        <h2 className="text-2xl font-hyemin-bold mb-4 text-center">
          나의 지원금
        </h2>
        <table className="w-full font-hyemin-bold text-center">
          <tbody>
            <tr>
              <td className="border border-gray-500 px-4 py-2">아침</td>
              <td className="border border-gray-500 px-4 py-2">6:35 ~ 08:00</td>
              <td className="border border-gray-500 px-4 py-2">1,500 원</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">점심</td>
              <td className="border border-gray-500 px-4 py-2">
                11: 00 ~ 14:00
              </td>
              <td className="border border-gray-500 px-4 py-2">1,500 원</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-4 py-2">저녁</td>
              <td className="border border-gray-500 px-4 py-2">
                18:00 ~ 20:00
              </td>
              <td className="border border-gray-500 px-4 py-2">1,500 원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
