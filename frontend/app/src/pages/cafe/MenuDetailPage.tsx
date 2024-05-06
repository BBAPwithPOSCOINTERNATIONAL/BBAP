import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import useCafeStore from "../../store/cafeStore";
import Button from "../../components/button";
import useCartStore from "../../store/cartStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import { Option, OptionChoice } from "../../api/cafeAPI";

function MenuDetailPage() {
  const selectedItem = useCafeStore((state) => state.selectedItem);
  const { addToCart } = useCartStore();
  const [totalPrice, setTotalPrice] = useState<number>(
    (selectedItem && selectedItem.price) || 0
  );
  const [warningText, setWarningText] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 처음 렌더링될 때 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);

  const optionOrder = ["온도", "사이즈", "에스프레소 샷", "추가옵션"];
  const initialSelectedOptions: Option[] = [];
  selectedItem?.options.forEach((option: Option) => {
    initialSelectedOptions.push({ ...option, choice: [] });
  });

  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSelectedOptions
  );
  const [selectedTemp, setSelectedTemp] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();

  const handleOptionChange = (optionName: string, choice: OptionChoice) => {
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
    let price = selectedItem?.price || 0;
    selectedOptions.forEach((option) => {
      option.choice.forEach((choice) => {
        price += choice.price;
      });
    });
    setTotalPrice(price * count);
  }, [selectedOptions, count, selectedItem]);

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
        menuId: selectedItem ? selectedItem.id : "",
        cnt: count,
        name: selectedItem ? selectedItem.name : "",
        price: totalPrice / count,
        options: selectedOptions,
      });

      navigate("/cafemain");
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
          className="relative bg-white mx-auto overflow-auto w-full pb-44"
        >
          <div className="overflow-auto w-full">
            <div id="body" className="mt-8">
              <div id="menu-info">
                <h1 className="text-2xl font-hyemin-bold text-center">
                  {selectedItem.name}
                </h1>
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-1/2 mx-auto my-2"
                />
                <p className="text-xl font-hyemin-bold text-center">
                  {selectedItem.price.toLocaleString()}원
                </p>
                <div className="text-sm font-hyemin-regular break-keep mx-6 bg-slate-100 p-4 my-2 text-center b rounded-lg">
                  <p>{selectedItem.description}</p>
                </div>
              </div>

              <div className="mx-10 text-start">
                {optionOrder.map((optionName) => {
                  const option = selectedItem.options.find(
                    (opt: Option) => opt.optionName === optionName
                  );
                  if (!option) return null; // Skip if the option is not present
                  return (
                    <div key={option.optionName} className="my-4">
                      <p className="text-xl font-hyemin-bold">
                        {option.optionName}{" "}
                        {option.required && (
                          <span className="my-auto text-red-500 text-xs">
                            *필수선택
                          </span>
                        )}
                      </p>
                      {/* 온도 옵션 렌더링 */}
                      {option.optionName === "온도" && (
                        <div className="flex my-4">
                          {option.choice.map(
                            (choice: OptionChoice, index: number) => (
                              <Button
                                key={index}
                                onClick={() =>
                                  handleOptionChange(option.optionName, choice)
                                }
                                text={choice.choiceName}
                                className={`border border-2 m-2 w-24 py-2 font-hyemin-bold text-black ${
                                  choice.choiceName === "HOT"
                                    ? "border-red-300"
                                    : choice.choiceName === "ICE"
                                    ? "border-blue-300"
                                    : ""
                                } ${
                                  selectedTemp === "ICE" &&
                                  choice.choiceName === "ICE"
                                    ? "bg-blue-200 border-2"
                                    : selectedTemp === "HOT" &&
                                      choice.choiceName === "HOT"
                                    ? "bg-red-200 border-2"
                                    : ""
                                }`}
                              />
                            )
                          )}
                        </div>
                      )}
                      {/* 사이즈 옵션 렌더링 */}
                      {option.optionName === "사이즈" && (
                        <div className="flex my-4">
                          {option.choice.map(
                            (choice: OptionChoice, index: number) => (
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
                                className={`border border-2 border-gray-400 m-1 w-28 py-2 font-hyemin-bold text-black ${
                                  selectedSize === choice.choiceName &&
                                  "bg-gray-200 border-2"
                                }
                      `}
                              />
                            )
                          )}
                        </div>
                      )}
                      {option.optionName !== "온도" &&
                        option.optionName !== "사이즈" &&
                        option.choice.map((choice: OptionChoice) => (
                          <div
                            key={choice.choiceName}
                            className="flex my-4 text-m font-hyemin-regular"
                          >
                            <input
                              id={choice.choiceName}
                              type={
                                option.type === "single" ? "radio" : "checkbox"
                              }
                              name={option.optionName}
                              className="w-10 "
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
              className={`fixed bottom-0 bg-[#E3E9F6] py-30 w-full  ${
                warningText ? "h-30" : "h-30"
              }`}
            >
              {warningText && (
                <p className="m-1 text-sm text-red-500 font-hyemin-bold text-center">
                  {warningText}
                </p>
              )}

              <div className="my-3 flex items-center justify-center text-base font-hyemin-bold space-x-3">
                <p className="text-xl font-hyemin-bold px-4">수량</p>
                <div
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <RemoveCircleOutlineIcon
                    sx={{
                      fontSize: 30,
                      color: `${count === 1 ? "lightGray" : "black"}`,
                    }}
                  />
                </div>
                <p className="text-xl ">{count}</p>
                <div
                  onClick={() => {
                    if (count < 99) {
                      setCount(count + 1);
                    }
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      fontSize: 30,
                      color: `${count === 99 ? "lightGray" : "black"}`,
                    }}
                  />
                </div>
              </div>
              <p className="mt-2 text-xl font-hyemin-bold text-center">
                총 결제가격 : {totalPrice?.toLocaleString()} 원
              </p>
              <div className="text-xl font-hyemin-bold flex justify-center space-x-8 my-3">
                <Button
                  onClick={() => navigate(-1)}
                  text="취소"
                  className="bg-bg-color w-2/5 py-3 text-white"
                />
                <Button
                  onClick={() => {
                    handleAddCart();
                  }}
                  text="담기"
                  className="bg-primary-color w-2/5 py-3 text-white"
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
