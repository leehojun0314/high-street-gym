export type TUser = {
	user_id: number;
	user_firstname: string;
	user_lastname: string;
	user_email: string;
	user_phone: string;
	user_role: 'ADMIN' | 'MEMBER' | 'TRAINER';
	dob: Date | null;
	gender: 'MALE' | 'FEMALE' | 'NOT_SPECIFIED';
};
