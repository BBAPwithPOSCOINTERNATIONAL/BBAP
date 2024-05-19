export interface Choice {
	choiceName: string;
	price: number;
}
export interface Option {
	optionName: string;
	type: string;
	required: boolean;
	choice: Choice[];
}
export interface Menu {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	options: Option[];
}

export interface CartItem {
	menuId: string;
	name: string;
	price: number;
	cnt: number;
	options: Option[];
}
