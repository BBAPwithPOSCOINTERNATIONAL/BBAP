import React from "react";
import useModalStore from "../store/modalStore";

const ConfirmModal: React.FC<{ handleClose: () => void }> = ({
	handleClose,
}) => {
	const { closeConfirmModal, confirmContent } = useModalStore();

	return (
		<div
			id="outer-layer"
			className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center text-center"
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				const target = e.target as HTMLElement;
				if (target.id === "outer-layer") {
					closeConfirmModal();
					handleClose();
				}
			}}
		>
			<div
				id="inner-layer"
				className="relative bg-white mx-auto z-20 rounded-2xl"
			>
				{confirmContent}
			</div>
		</div>
	);
};

export default ConfirmModal;
