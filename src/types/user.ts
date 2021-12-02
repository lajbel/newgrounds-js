export interface User {
	id: number;
	name: string;
	supporter: boolean;
	icons: UserIcons;
}

export interface UserIcons {
	small: string;
	medium: string;
	large: string;
}
