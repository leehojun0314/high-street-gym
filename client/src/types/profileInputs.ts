export interface ProfileInputs {
  firstname: string;
  lastname: string;
  email: string;
  password?: string | null;
  dob?: Date | null;
  mobile: string;
  gender: 'MALE' | 'FEMALE' | 'NOT_SPECIFIED';
  confirmPwd?: string | null;
}
