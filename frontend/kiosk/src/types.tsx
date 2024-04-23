export interface Menu {
	name: string;
	temperature?: string[];
	size?: { [size: string]: number };
	description: string;
	price: number;
	image: string;
	options?: { [option: string]: number };
}
