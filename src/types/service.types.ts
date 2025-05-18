import { AxiosResponse } from 'axios';
import { IAuthResponse } from './auth.types';

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type AuthApiResponse = AxiosResponse<IApiResponse<IAuthResponse>>;

export interface IServiceError {
  message: string;
  statusCode?: number;
  field?: string;
} 