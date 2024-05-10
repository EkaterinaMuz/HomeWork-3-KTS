import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Option } from '@/shared/ui/MultiDropdown';
import ApiService from '@/shared/api/ApiService';
import { CollectionModel, getInitialCollectionModel, normalizeCollection } from '@/shared/lib/collection';
import { ILocalStore } from '@/shared/lib/hooks';
import { Meta } from '@/shared/types/Meta';
import { Category } from '@/entities/products/Products';
import { categoriesToOption } from '../lib/categoriesToOptions';

type PrivateFields = '_categories' | '_meta' | '_currentCategory';

class CategoryStore implements ILocalStore {
  private _categories: CollectionModel<number, Category> = getInitialCollectionModel();
  private _currentCategory: Category | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _categories: observable.shallow,
      _currentCategory: observable.shallow,
      _meta: observable,
      categories: computed,
      currentCategory: computed,
      meta: computed,
      getCategoryList: action.bound,
      setCurrentCategory: action.bound,
    });
  }

  get categories(): Option[] {
    return categoriesToOption(this._categories);
  }
  get currentCategory(): Option[] | null {
    if (this._currentCategory) {
      return categoriesToOption(normalizeCollection((elem) => elem.id, [this._currentCategory]));
    }
    return null;
  }
  get meta(): Meta {
    return this._meta;
  }

  setCurrentCategory(categoryId: string | null) {
    this._currentCategory = categoryId ? this._categories.entities[Number(categoryId)] : null;
  }

  async getCategoryList(url: string) {
    this._meta = Meta.loading;
    this._categories = getInitialCollectionModel();

    try {
      const response = await ApiService.get<Category[]>(url);
      runInAction(() => {
        this._categories = normalizeCollection((elem) => elem.id, response);
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  destroy(): void {}
}

export default CategoryStore;
