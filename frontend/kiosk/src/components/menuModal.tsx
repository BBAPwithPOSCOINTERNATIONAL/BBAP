import React from "react";
import useModalStore from "../store/modalStore";

const MenuModal: React.FC = () => {
	const { closeMenuModal, selectedMenu } = useModalStore();
	return (
		<div
			id="outer-layer"
			className="absolute w-full h-full bg-black z-50"
			onClick={closeMenuModal}
		>
			{selectedMenu && (
				<div id="inner-layer" className="bg-white w-2/3 mx-auto">
					<div id="header">음료 선택</div>
					<div id="body">
						<p>{selectedMenu.name}</p>
						<img src={selectedMenu.image} alt={selectedMenu.name} />
						<p>{selectedMenu.description}</p>
						<p>{selectedMenu.price}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MenuModal;
