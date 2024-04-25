import React, { useState, useEffect } from "react";
import useModalStore from "../store/modalStore";
import useCartStore from "../store/cartStore";
import Button from "./button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const MenuModal: React.FC = () => {
	const { closeMenuModal, selectedMenu } = useModalStore();
	const { addToCart } = useCartStore();
	const [selectedTemp, setSelectedTemp] = useState<string>();
	const [selectedSize, setSelectedSize] = useState<string>();
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(
		(selectedMenu && selectedMenu.price) || 0
	);
	const [warningText, setWarningText] = useState<string>("");
	const [count, setCount] = useState<number>(1);

	// 커피/음료 메뉴 -> 온도/사이즈 선택지가 있음
	const isHasOptions =
		selectedMenu &&
		Object.prototype.hasOwnProperty.call(selectedMenu, "temperature") &&
		Object.prototype.hasOwnProperty.call(selectedMenu, "size");

	const sizeArr: string[] | undefined =
		selectedMenu?.size && Object.keys(selectedMenu.size);

	useEffect(() => {
		// option과 size 선택에 따라 totalPrice가 달라지도록 함
		let totalPrice = selectedMenu?.price || 0;

		if (selectedMenu && selectedMenu.options && selectedOptions) {
			selectedOptions.forEach((item) => {
				totalPrice += selectedMenu.options ? selectedMenu.options[item] : 0;
			});
		}

		if (selectedMenu && selectedMenu.size && selectedSize) {
			totalPrice += selectedMenu.size[selectedSize] || 0;
		}

		setTotalPrice(totalPrice * count);
	}, [selectedOptions, selectedSize, selectedMenu, count]);

	const handleAddCart = () => {
		if (selectedMenu) {
			if (isHasOptions && (!selectedSize || !selectedTemp)) {
				setWarningText("온도 및 사이즈 선택은 필수입니다.");
			} else {
				const menuInfo = {
					name: selectedMenu.name,
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
				console.log(menuInfo);
				addToCart(menuInfo);
				closeMenuModal();
			}
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
					<div className="overflow-auto w-full max-h-[1600px] min-h-[1000px] pb-[400px]">
						<div
							id="header"
							className="bg-primary-color rounded-t-2xl h-28 py-4 text-base text-white"
						>
							메뉴 선택
						</div>
						<div id="body" className="mt-10">
							<div id="menu-info">
								<p className="text-sm font-bold">{selectedMenu.name}</p>
								<img
									src={selectedMenu.image}
									alt={selectedMenu.name}
									className="w-1/3 mx-auto my-5"
								/>
								<p className="text-xs break-keep mx-40">
									{selectedMenu.description}
								</p>
								<p className="text-xs font-bold my-3">
									{selectedMenu.price.toLocaleString()} 원
								</p>
							</div>
							{isHasOptions && (
								<div id="menu-option" className="text-start text-base mx-16">
									<div id="temperature">
										<p>1. 온도</p>
										<div className="ml-16 my-5 space-x-10">
											{selectedMenu.temperature?.map((item, index) => (
												<Button
													key={index}
													onClick={() => setSelectedTemp(item)}
													text={item}
													className={`border border-4 w-44 py-2 font-bold text-black ${
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
									</div>
									<div id="size">
										<p>2. 사이즈</p>
										<div className="ml-16 my-5 space-x-10">
											{sizeArr?.map((item, index) => (
												<Button
													key={index}
													onClick={() => setSelectedSize(item)}
													text={
														<div>
															{item}{" "}
															<p className="text-2xs">
																+{" "}
																{selectedMenu.size &&
																	selectedMenu.size[item].toLocaleString()}
															</p>
														</div>
													}
													className={`border border-4 border-black w-52 py-2 font-bold text-black ${
														selectedSize === item ? "bg-gray-300" : ""
													}
                      `}
												/>
											))}
										</div>
									</div>
									<div id="options">
										<p>3. 추가 선택</p>
										<div className="text-sm space-y-3 my-5">
											{selectedMenu.options &&
												Object.entries(selectedMenu.options).map(
													([option, price]) => (
														<div key={option} className="flex space-x-10 ml-16">
															<input
																type="checkbox"
																id={option}
																name={option}
																className="w-10"
																onClick={() => {
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
															<label
																htmlFor={option}
																className="flex-grow flex justify-between"
															>
																<p>{option}</p>
																<p>+ {price.toLocaleString()} 원</p>
															</label>
														</div>
													)
												)}
										</div>
									</div>
								</div>
							)}
						</div>
						<div
							id="footer"
							className={`absolute bottom-0 bg-stone-100 rounded-b-2xl py-3 w-full ${
								warningText ? "h-[400px]" : "h-[350px]"
							}`}
						>
							{warningText && (
								<p className="text-sm text-red-500 font-bold">{warningText}</p>
							)}

							{/* 수량 변경 */}
							<div className="my-6 flex items-center justify-center text-base font-bold space-x-10">
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
											fontSize: 55,
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
											fontSize: 55,
											color: `${count === 99 ? "lightGray" : "black"}`,
										}}
									/>
								</div>
							</div>
							<p className="text-base font-bold text-center">
								총 결제가격: {totalPrice?.toLocaleString()} 원
							</p>
							<div className="text-base flex justify-center space-x-20 my-3">
								<Button
									onClick={closeMenuModal}
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
};

export default MenuModal;
