export interface Menu {
	name: string;
	temperature?: string[];
	size?: string[];
	description: string;
	price: number;
	image: string;
	options?: { [option: string]: number };
}
