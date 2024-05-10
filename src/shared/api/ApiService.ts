import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ParsedQs } from 'qs';
import { baseURL } from './constants';

export interface ProductApiOptions {
  limit: number;
  offset: number;
  title?: string | string[] | ParsedQs | ParsedQs[];
  categoryId?: string | string[] | ParsedQs | ParsedQs[];
}

class ApiService {
  private _axios: AxiosInstance;
  private _configs: AxiosRequestConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  };
  constructor() {
    this._axios = axios.create(this._configs);
  }
  async get<T>(url: string, options?: ProductApiOptions): Promise<T> {
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
