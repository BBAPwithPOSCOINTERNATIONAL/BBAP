import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import useCafeStore from "../../store/useCafe";
import Button from "../../components/button";
import useCartStore from "../../store/cartStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";

function MenuDetailPage() {
  const selectedItem = useCafeStore((state) => state.selectedItem);
  const { addToCart } = useCartStore();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedTemp, setSelectedTemp] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [totalPrice, setTotalPrice] = useState<number>(
    (selectedItem && selectedItem.price) || 0
  );
  const [warningText, setWarningText] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const navigate = useNavigate();

  // 커피/음료 메뉴 -> 온도/사이즈 선택지가 있음
  const isHasOptions =
    selectedItem &&
    Object.prototype.hasOwnProperty.call(selectedItem, "temperature") &&
    Object.prototype.hasOwnProperty.call(selectedItem, "size");

  const sizeArr: string[] | undefined =
    selectedItem?.size && Object.keys(selectedItem.size);

  useEffect(() => {
    // option과 size 선택에 따라 totalPrice가 달라지도록 함
    let totalPrice = selectedItem?.price || 0;

    if (selectedItem && selectedItem.options && selectedOptions) {
      selectedOptions.forEach((item) => {
        totalPrice += selectedItem.options ? selectedItem.options[item] : 0;
      });
    }

    if (selectedItem && selectedItem.size && selectedSize) {
      totalPrice += selectedItem.size[selectedSize] || 0;
    }

    setTotalPrice(totalPrice * count);
  }, [selectedOptions, selectedSize, selectedItem, count]);

  const handleAddCart = () => {
    if (selectedItem) {
      if (isHasOptions && (!selectedSize || !selectedTemp)) {
        setWarningText("온도 및 사이즈 선택은 필수입니다.");
      } else {
        const menuInfo = {
          name: selectedItem.name,
          price: totalPrice / count,
          count,
          options: [] as string[],
        };

        const options = [];

        if (selectedSize) {
          options.push(selectedSize);
        }
        if (selectedTemp) {
          options.push(selectedTemp);
        }
        if (selectedOptions) {
          options.push(...selectedOptions);
        }

        menuInfo.options = options;

        addToCart(menuInfo);
        navigate("/cafemain");
      }
    }
  };

  const navBarHeight = 50; // NavBar의 높이 추정값
  return (
    <div>
      <div
        className="sticky top-0 z-30 bg-white"
        style={{ height: `${navBarHeight}px` }}
      >
        <NavBar />
      </div>

      {selectedItem && (
        <div
          id="inner-layer"
          className="relative bg-white mx-auto rounded-2xl overflow-auto w-full pb-44"
        >
          <div className="overflow-auto w-full">
            <div
              id="header"
              className="bg-primary-color text-2xl h-14 py-4 font-hyemin-bold text-white text-center"
            >
              음료 선택
            </div>
            <div id="body" className="mt-3">
              <div id="menu-info">
                <h1 className="text-3xl font-hyemin-bold text-center">
                  {selectedItem.name}
                </h1>
                <img
                  src={selectedItem.images}
                  alt={selectedItem.name}
                  className="w-1/2 mx-auto my-2"
                />
                <p className="text-sm break-keep mx-10 mb-2">
                  {selectedItem.description}
                </p>
                <p className="text-2xl font-hyemin-bold text-center">
                  {selectedItem.price.toLocaleString()}원
                </p>
              </div>

              {isHasOptions && (
                <div id="menu-option" className="text-start mx-1">
                  <div id="temperature">
                    <p className="font-hyemin-bold text-2xl">1. 온도</p>
                    {selectedItem.temperature && (
                      <div className="my-4">
                        {selectedItem.temperature.map((item, index) => (
                          <Button
                            key={index}
                            onClick={() => setSelectedTemp(item)}
                            text={item}
                            className={`border border-2 m-2 w-32 py-2 font-hyemin-bold text-black ${
                              item === "HOT"
                                ? "border-red-500"
                                : item === "ICE"
                                ? "border-blue-500"
                                : ""
                            } ${selectedTemp === item ? "bg-gray-300" : ""}
                      `}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div id="size">
                    <p className="font-hyemin-bold text-2xl">2. 사이즈</p>
                    <div className="my-3 flex flex-wrap">
                      {sizeArr?.map((item, index) => (
                        <Button
                          key={index}
                          onClick={() => setSelectedSize(item)}
                          text={
                            <div>
                              <p className="text-2xs"> {item}</p>
                              <p className="text-xs">
                                +{" "}
                                {selectedItem.size &&
                                  selectedItem.size[item].toLocaleString()}{" "}
                                원
                              </p>
                            </div>
                          }
                          className={`border border-2 ml-2 border-black w-24 py-2 font-hyemin-bold text-black ${
                            selectedSize === item ? "bg-gray-300" : ""
                          }
          `}
                        />
                      ))}
                    </div>
                  </div>
                  <div id="options">
                    <p className="font-hyemin-bold text-2xl">3. 추가선택</p>
                    {selectedItem.options && (
                      <div className="my-3">
                        {Object.entries(selectedItem.options).map(
                          ([option, price]) => (
                            <div
                              key={option}
                              className="flex items-center my-2"
                            >
                              <input
                                type="checkbox"
                                id={option}
                                name={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => {
                                  setSelectedOptions((prev) => {
                                    if (prev.includes(option)) {
                                      return prev.filter(
                                        (item) => item !== option
                                      );
                                    } else {
                                      return [...prev, option];
                                    }
                                  });
                                }}
                              />
                              <label htmlFor={option} className="text-base">
                                {option} (+{price.toLocaleString()}원)
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              id="footer"
              className={`fixed bottom-0 bg-stone-100 rounded py-30 w-full ${
                warningText ? "h-30" : "h-30"
              }`}
            >
              {warningText && (
                <p className="m-1 text-sm text-red-500 font-bold text-center">
                  {warningText}
                </p>
              )}
              <p className="mt-2 text-xl font-hyemin-bold text-center">
                총 결제가격: {totalPrice?.toLocaleString()} 원
              </p>
              <div className="my-3 flex items-center justify-center text-base font-bold space-x-10">
                <p className="text-xl font-hyemin-bold">수량</p>
                <div
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <RemoveCircleOutlineIcon
                    sx={{
                      fontSize: 35,
                      color: `${count === 1 ? "lightGray" : "black"}`,
                    }}
                  />
                </div>
                <p>{count}</p>
                <div
                  onClick={() => {
                    if (count < 99) {
                      setCount(count + 1);
                    }
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      fontSize: 35,
                      color: `${count === 99 ? "lightGray" : "black"}`,
                    }}
                  />
                </div>
              </div>
              <div className="text-base flex justify-center space-x-10 my-3">
                <Button
                  onClick={() => navigate(-1)}
                  text="취소"
                  className="bg-bg-color w-1/3 py-2 text-white"
                />
                <Button
                  onClick={() => {
                    handleAddCart();
                  }}
                  text="담기"
                  className="bg-primary-color w-1/3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuDetailPage;
