import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import useCafeStore from "../../store/useCafe";
import Button from "../../components/button";
import useCartStore from "../../store/cartStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";

export interface Choice {
	choice_name: string;
	price: number;
}
export interface Option {
	option_name: string;
	type: string;
	required: boolean;
	choices: Choice[];
}

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
	selectedItem?.options.forEach((option) => {
		initialSelectedOptions.push({ ...option, choices: [] });
	});

	const [selectedOptions, setSelectedOptions] = useState<Option[]>(
		initialSelectedOptions
	);
	const [selectedTemp, setSelectedTemp] = useState<string>();
	const [selectedSize, setSelectedSize] = useState<string>();

	const handleOptionChange = (optionName: string, choice: Choice) => {
		if (optionName === "온도") {
			setSelectedTemp(choice.choice_name);
		}
		if (optionName === "사이즈") {
			setSelectedSize(choice.choice_name);
		}

		setSelectedOptions((prevState) => {
			const updatedOptions = prevState.map((option) => {
				if (option.option_name === optionName) {
					if (option.type === "single") {
						return {
							...option,
							choices: [choice],
						};
					} else {
						const selectedChoiceIndex = option.choices.findIndex(
							(selectedChoice) =>
								selectedChoice.choice_name === choice.choice_name
						);
						if (selectedChoiceIndex !== -1) {
							// choice가 choices 배열 안에 있는 경우 => 삭제
							return {
								...option,
								choices: option.choices.filter(
									(selectedChoice) =>
										selectedChoice.choice_name !== choice.choice_name
								),
							};
						} else {
							// choice가 choices 배열 안에 없는 경우 => 추가
							return {
								...option,
								choices: [...option.choices, choice],
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
		selectedOptions.map((option) => {
			option.choices.map((choice) => {
				price += choice.price;
			});
		});
		setTotalPrice(price * count);
	}, [selectedOptions, count]);

	const checkOptions = () => {
		let flag = true;
		selectedOptions.map((option) => {
			// required가 true인 경우 => choices의 길이가 0보다 커야한다
			if (option.required && option.choices.length === 0) {
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
									src={selectedItem.imageUrl}
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

							<div className="mx-10 text-start">
								{optionOrder.map((optionName) => {
									const option = selectedItem.options.find(
										(opt) => opt.option_name === optionName
									);
									if (!option) return null; // Skip if the option is not present
									return (
										<div key={option.option_name} className="my-4">
											<p className="text-2xl font-hyemin-bold">
												{option.option_name}{" "}
												{option.required && (
													<span className="my-auto text-red-500 text-xs">
														*필수선택
													</span>
												)}
											</p>
											{/* 온도 옵션 렌더링 */}
											{option.option_name === "온도" && (
												<div className="flex my-4">
													{option.choices.map((choice, index) => (
														<Button
															key={index}
															onClick={() =>
																handleOptionChange(option.option_name, choice)
															}
															text={choice.choice_name}
															className={`border border-2 m-2 w-24 py-2 font-hyemin-bold text-black ${
																choice.choice_name === "HOT"
																	? "border-red-500"
																	: choice.choice_name === "ICE"
																	? "border-blue-500"
																	: ""
															} ${
																selectedTemp === choice.choice_name &&
																"bg-gray-200 border-4"
															}
                      `}
														/>
													))}
												</div>
											)}
											{/* 사이즈 옵션 렌더링 */}
											{option.option_name === "사이즈" && (
												<div className="flex my-4">
													{option.choices.map((choice, index) => (
														<Button
															key={index}
															onClick={() =>
																handleOptionChange(option.option_name, choice)
															}
															text={
																<div>
																	{choice.choice_name}{" "}
																	<p className="text-xs">
																		+ {choice.price.toLocaleString()}
																	</p>
																</div>
															}
															className={`border border-2 border-black m-2 w-24 py-2 font-hyemin-bold text-black ${
																selectedSize === choice.choice_name &&
																"bg-gray-200 border-4"
															}
                      `}
														/>
													))}
												</div>
											)}
											{option.option_name !== "온도" &&
												option.option_name !== "사이즈" &&
												option.choices.map((choice) => (
													<div
														key={choice.choice_name}
														className="flex my-4 text-sm"
													>
														<input
															id={choice.choice_name}
															type={
																option.type === "single" ? "radio" : "checkbox"
															}
															name={option.option_name}
															className="w-10"
															value={choice.choice_name}
															onChange={() =>
																handleOptionChange(option.option_name, choice)
															}
														/>
														<label
															htmlFor={choice.choice_name}
															className="flex-grow flex justify-between"
														>
															<p>{choice.choice_name}</p>
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
							className={`fixed bottom-0 bg-stone-100 rounded py-30 w-full ${
								warningText ? "h-30" : "h-30"
							}`}
						>
							{warningText && (
								<p className="m-1 text-sm text-red-500 font-hyemin-bold text-center">
									{warningText}
								</p>
							)}
							<p className="mt-2 text-xl font-hyemin-bold text-center">
								총 결제가격: {totalPrice?.toLocaleString()} 원
							</p>
							<div className="my-3 flex items-center justify-center text-base font-hyemin-bold space-x-5">
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
											fontSize: 30,
											color: `${count === 1 ? "lightGray" : "black"}`,
										}}
									/>
								</div>
								<p className="text-xl">{count}</p>
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
