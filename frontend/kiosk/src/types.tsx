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
