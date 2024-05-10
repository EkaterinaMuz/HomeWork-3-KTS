import { action, computed, makeObservable, observable, set } from 'mobx';
import { CollectionModel, getInitialCollectionModel, linearizeCollection } from '@shared/libs/collection';
import { ILocalStore } from '@shared/libs/hooks';
import { CartProduct, Product } from '@shared/types/Products';

type PrivateFields = '_cartItems';

class CartStore implements ILocalStore {
  private _cartItems: CollectionModel<number | string, CartProduct> = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : getInitialCollectionModel();
  // private _totalItemsCount: number | null = null;
  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cartItems: observable,
      addToCart: action.bound,
      cartItems: computed,
    });
  }

  get cartItems(): CartProduct[] {
    return linearizeCollection(this._cartItems);
  }
  // get totalItemsCount(): number | null {
  //   return this._totalItemsCount;
  // }

  addToCart(product: Product) {
    const itemIndex = this._cartItems.order.find((id) => id === product.id);
    const cartProduct = {
      ...product,
      quantity: 1,
    };
    if (Number(itemIndex) >= 0) {
      set(this._cartItems.entities[product.id], 'quantity', (this._cartItems.entities[product.id].quantity += 1));
    } else {
      set(this._cartItems.entities, product.id, cartProduct);
      this._cartItems.order.push(product.id);
    }
    localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
    // this._totalItemsCount = localStorage.getItem('cartItems') && JSON.parse(localStorage.getItem('cartItems')).order;
    // this.setTotalItemsCount();
    // console.log(this._totalItemsCount);
  }

  destroy(): void {}
}

export default CartStore;
