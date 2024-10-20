export interface RegisterInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob?: Date | null;
  mobile: string;
  gender: 'MALE' | 'FEMALE' | 'NOT_SPECIFIED';
  confirmPwd: string;
}
