import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseURL } from './constants';

class ApiService {
  private _axios: AxiosInstance;
  private _configs: AxiosRequestConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  constructor() {
    this._axios = axios.create(this._configs);
  }
  async get<T, U>(url: string, options?: U): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this._axios.get<T>(url, { params: options });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
      throw new Error('Unknown error occurred');
    }
  }
}

export default new ApiService();
