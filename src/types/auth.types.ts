export interface IUser {
  id: string;
  fullName: string;
  email: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export class LoginFormFields {
  email: string = '';
  password: string = '';
}

export class SignupFormFields {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
}

export interface IAuthError {
  message: string;
  field?: keyof LoginFormFields | keyof SignupFormFields;
} 