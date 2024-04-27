import axios, { AxiosResponse } from 'axios';
import { baseURL } from '@shared/api/constants';
import { Product } from '@shared/types/Products';

class CatalogService {
  static getAllProducts = (): Promise<Product[]> => {
    return axios
      .get<Product[]>(`/products/?offset=0&limit=9`, { baseURL })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      });
  };
  static getProductById = async (ProductId: string): Promise<Product> => {
    return axios
      .get<Product>(`${BASE_URL}/products/${ProductId}`)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      });
  };
  // static getProductsByCategory = async (CategoryId: number): Promise<Product[]> => {
  //   return axios
  //     .get(`${BASE_URL}/categories/${CategoryId}/products/?offset=${Math.floor(Math.random() * 10)}&limit=3`)
  //     .then((response: AxiosResponse) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       if (axios.isAxiosError(error)) {
  //         console.log(error.message);
  //       } else if (error instanceof Error) {
  //         console.log(error.message);
  //       }
  //     });
  // };
}

export default CatalogService;
