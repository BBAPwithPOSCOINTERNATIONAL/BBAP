import React, { useState, useEffect } from "react";
import useModalStore from "../store/modalStore";
import useCartStore from "../store/cartStore";
import Button from "./button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Choice, Option } from "../types";

const MenuModal: React.FC = () => {
  const { closeMenuModal, selectedMenu } = useModalStore();
  const { addToCart } = useCartStore();
  const [totalPrice, setTotalPrice] = useState<number>(
    (selectedMenu && selectedMenu.price) || 0
  );
  const [warningText, setWarningText] = useState<string>("");
  const [count, setCount] = useState<number>(1);

  const optionOrder = ["온도", "사이즈", "에스프레소 샷", "추가옵션"];
  const initialSelectedOptions: Option[] = [];
  selectedMenu?.options.forEach((option) => {
    initialSelectedOptions.push({ ...option, choice: [] });
  });

  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSelectedOptions
  );
  const [selectedTemp, setSelectedTemp] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();

  const handleOptionChange = (optionName: string, choice: Choice) => {
    if (optionName === "온도") {
      setSelectedTemp(choice.choiceName);
    }
    if (optionName === "사이즈") {
      setSelectedSize(choice.choiceName);
    }

    setSelectedOptions((prevState) => {
      const updatedOptions = prevState.map((option) => {
        if (option.optionName === optionName) {
          if (option.type === "single") {
            return {
              ...option,
              choice: [choice],
            };
          } else {
            const selectedChoiceIndex = option.choice.findIndex(
              (selectedChoice) =>
                selectedChoice.choiceName === choice.choiceName
            );
            if (selectedChoiceIndex !== -1) {
              // choice가 choice 배열 안에 있는 경우 => 삭제
              return {
                ...option,
                choice: option.choice.filter(
                  (selectedChoice) =>
                    selectedChoice.choiceName !== choice.choiceName
                ),
              };
            } else {
              // choice가 choice 배열 안에 없는 경우 => 추가
              return {
                ...option,
                choice: [...option.choice, choice],
              };
            }
          }
        } else {
          return option;
        }
      });
      return updatedOptions;
    });
  };

  // 옵션 선택 변경될때마다, 수량 변경될 때마다 가격 다시 계산
  useEffect(() => {
    let price = selectedMenu?.price || 0;
    selectedOptions.map((option) => {
      option.choice.map((choice) => {
        price += choice.price;
      });
    });
    setTotalPrice(price * count);
  }, [selectedOptions, count]);

  const checkOptions = () => {
    let flag = true;
    selectedOptions.map((option) => {
      // required가 true인 경우 => choice의 길이가 0보다 커야한다
      if (option.required && option.choice.length === 0) {
        setWarningText("필수 옵션을 선택해주세요");
        flag = false;
      }
    });
    return flag;
  };

  const handleAddCart = () => {
    if (checkOptions()) {
      addToCart({
        menuId: selectedMenu ? selectedMenu.id : "",
        cnt: count,
        name: selectedMenu ? selectedMenu.name : "",
        price: totalPrice / count,
        options: selectedOptions,
      });
      closeMenuModal();
    }
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center text-center"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.id === "outer-layer") {
          closeMenuModal();
        }
      }}
    >
      {selectedMenu && (
        <div
          id="inner-layer"
          className="relative bg-white w-5/6 mx-auto my-64 z-20 rounded-2xl"
        >
          <div className="overflow-auto w-full max-h-[1000px] min-h-[800px] pb-[260px]">
            <div
              id="header"
              className="bg-primary-color rounded-t-2xl h-20 py-4 text-base text-white"
            >
              메뉴 선택
            </div>
            <div id="body" className="mt-10">
              <div id="menu-info">
                <p className="text-base font-bold">{selectedMenu.name}</p>
                <img
                  src={selectedMenu.imageUrl}
                  alt={selectedMenu.name}
                  className="w-1/3 mx-auto my-5"
                />
                <p className="text-xs break-keep mx-40">
                  {selectedMenu.description}
                </p>
                <p className="text-sm font-bold my-3">
                  {selectedMenu.price.toLocaleString()} 원
                </p>
              </div>
              <div className="mx-5 text-start">
                {optionOrder.map((optionName) => {
                  const option = selectedMenu.options.find(
                    (opt) => opt.optionName === optionName
                  );
                  if (!option) return null; // Skip if the option is not present
                  return (
                    <div key={option.optionName} className="my-10">
                      <p className="text-base font-bold">
                        {option.optionName}{" "}
                        {option.required && (
                          <span className="my-auto text-red-500 text-xs">
                            *필수선택
                          </span>
                        )}
                      </p>
                      {/* 온도 옵션 렌더링 */}
                      {option.optionName === "온도" && (
                        <div className="ml-10 my-5 space-x-6">
                          {option.choice.map((choice, index) => (
                            <Button
                              key={index}
                              onClick={() =>
                                handleOptionChange(option.optionName, choice)
                              }
                              text={choice.choiceName}
                              className={`border border-4 w-32 py-5 font-bold text-sm text-black ${
                                choice.choiceName === "HOT"
                                  ? "border-red-300"
                                  : choice.choiceName === "ICE"
                                  ? "border-blue-300"
                                  : ""
                              } ${
                                selectedTemp === "ICE" &&
                                choice.choiceName === "ICE"
                                  ? "bg-blue-200 border-4"
                                  : selectedTemp === "HOT" &&
                                    choice.choiceName === "HOT"
                                  ? "bg-red-200 border-4"
                                  : ""
                              }}
															
                      `}
                            />
                          ))}
                        </div>
                      )}
                      {/* 사이즈 옵션 렌더링 */}
                      {option.optionName === "사이즈" && (
                        <div className="ml-10 my-5 space-x-6">
                          {option.choice.map((choice, index) => (
                            <Button
                              key={index}
                              onClick={() =>
                                handleOptionChange(option.optionName, choice)
                              }
                              text={
                                <div>
                                  {choice.choiceName}{" "}
                                  <p className="text-xs">
                                    + {choice.price.toLocaleString()} 원
                                  </p>
                                </div>
                              }
                              className={`border border-4 border-gray-400 w-40 py-2 font-bold text-black text-sm ${
                                selectedSize === choice.choiceName &&
                                "bg-gray-200 border-4"
                              }
                      `}
                            />
                          ))}
                        </div>
                      )}
                      {option.optionName !== "온도" &&
                        option.optionName !== "사이즈" &&
                        option.choice.map((choice) => (
                          <div
                            key={choice.choiceName}
                            className="flex space-x-4 ml-10 my-5 text-sm items-center"
                          >
                            <input
                              id={choice.choiceName}
                              type={
                                option.type === "single" ? "radio" : "checkbox"
                              }
                              name={option.optionName}
                              className="w-8 h-8"
                              value={choice.choiceName}
                              onChange={() =>
                                handleOptionChange(option.optionName, choice)
                              }
                            />
                            <label
                              htmlFor={choice.choiceName}
                              className="flex-grow flex justify-between"
                            >
                              <p>{choice.choiceName}</p>
                              <p>+ {choice.price.toLocaleString()} 원</p>
                            </label>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              id="footer"
              className={`absolute bottom-0  bg-[#E3E9F6] rounded-b-2xl py-3 w-full ${
                warningText ? "h-[290px]" : "h-[250px]"
              }`}
            >
              {warningText && (
                <p className="text-sm text-red-500 font-bold">{warningText}</p>
              )}

              {/* 수량 변경 */}
              <div className="my-4 flex items-center justify-center text-base font-bold space-x-5">
                <p>수량</p>
                <div
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <RemoveCircleOutlineIcon
                    sx={{
                      fontSize: 50,
                      color: `${count === 1 ? "lightGray" : "black"}`,
                    }}
                  />
                </div>
                <p>{count}</p>
                <div
                  onClick={() => {
                    if (count < 30) {
                      setCount(count + 1);
                    }
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      fontSize: 50,
                      color: `${count === 30 ? "lightGray" : "black"}`,
                    }}
                  />
                </div>
              </div>
              <p className="text-base font-bold text-center">
                총 결제가격: {totalPrice?.toLocaleString()} 원
              </p>
              <div className="text-lg flex justify-center space-x-12 my-3">
                <Button
                  onClick={closeMenuModal}
                  text="취소"
                  className="bg-bg-color w-1/4 py-2 text-white"
                />
                <Button
                  onClick={() => {
                    handleAddCart();
                  }}
                  text="담기"
                  className="bg-primary-color w-1/4 py-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuModal;
