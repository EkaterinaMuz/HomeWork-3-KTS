import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import rootStore from '@shared/RootStore/instance';
import ApiService, { ProductApiOptions } from '@shared/api';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@/shared/lib/collection';
import { ILocalStore } from '@/shared/lib/hooks';
import { Meta } from '@shared/types/Meta';
import { Product } from '@shared/types/Products';

type PrivateFields = '_list' | '_meta' | '_product' | '_hasMore' | '_realtedProducts';

class ProductsStore implements ILocalStore {
  private _list: CollectionModel<number | string, Product> = getInitialCollectionModel();
  private _product: Product | null = null;
  private _realtedProducts: Product[] = [];
  private _hasMore: boolean = true;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable,
      _product: observable,
      _realtedProducts: observable,
      _hasMore: observable,
      _meta: observable,
      list: computed,
      product: computed,
      meta: computed,
      getProductsList: action.bound,
      getMoreProducts: action.bound,
      getProductById: action.bound,
    });
  }

  get list(): Product[] {
    return linearizeCollection(this._list);
  }
  get product(): Product | null {
    return this._product;
  }
  get relatedItems(): Product[] {
    return this._realtedProducts;
  }
  get hasMore(): boolean {
    return this._hasMore;
  }
  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(url: string, params: ProductApiOptions) {
    let { limit, offset } = params;
    this._meta = Meta.loading;

    try {
      if (!limit) {
        limit = 10;
      }
      const response = await ApiService.get<Product[]>(url, params);
      response.length < 10 ? (this._hasMore = false) : (this._hasMore = true);
      runInAction(() => {
        if (!offset) {
          this._list = normalizeCollection((elem) => elem.id, response);
        } else {
          this._list = normalizeCollection((elem) => elem.id, [...linearizeCollection(this._list), ...response]);
        }
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async getMoreProducts() {
    const params = {
      limit: 10,
      offset: this.list.length + 10,
      title: rootStore.query.getParam('search'),
      categoryId: rootStore.query.getParam('categoryId'),
    };
    await this.getProductsList('/products', params);
  }

  async getProductById(id: string) {
    this._meta = Meta.loading;
    this._product = null;
    try {
      const product = await ApiService.get<Product>(`/products/${id}`);
      const categoryId = product.category.id;
      const relatedProducts = await ApiService.get<Product[]>(`/categories/${categoryId}/products/?offset=0&limit=3`);
      this._realtedProducts = relatedProducts;
      this._product = product;
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}

export default ProductsStore;
