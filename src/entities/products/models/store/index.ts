import { action, computed, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx';
import ApiService, { ProductApiOptions } from '@shared/api/ApiService';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@shared/libs/collection';
import { ILocalStore } from '@shared/libs/hooks';
import { Meta } from '@shared/types/Meta';
import { Product } from '@shared/types/Products';

// type PrivateFields = '_list' | '_meta' | '_product' | '_queryTitle';

class ProductsStore implements ILocalStore {
  private _list: CollectionModel<number, Product> = getInitialCollectionModel();
  private _product: Product | null = null;
  private _meta: Meta = Meta.initial;
  private _queryTitle: string = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get list(): Product[] {
    return linearizeCollection(this._list);
  }
  get product(): Product | null {
    return this._product;
  }
  get meta(): Meta {
    return this._meta;
  }
  setQueryTitle(title: string): void {
    this._queryTitle = title;
  }

  async getProductsList(url: string, params: ProductApiOptions) {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const response = await ApiService.get<Product[]>(url, params);
      runInAction(() => {
        const list = normalizeCollection((elem) => elem.id, response);
        console.log(list);
        this._list = list;
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }
  async getProductById(id: string) {
    this._meta = Meta.loading;
    this._product = null;

    try {
      const response = await ApiService.get<Product>(`/products/${id}`);
      this._product = response;
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}

export default ProductsStore;
