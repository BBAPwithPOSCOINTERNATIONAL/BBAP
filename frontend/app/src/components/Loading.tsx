import loading from "/assets/images/loading.gif";

function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <img src={loading} alt="Loading..." />
    </div>
  );
}

export default Loading;
