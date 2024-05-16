import { action, computed, makeAutoObservable, makeObservable, observable, remove, set, toJS } from 'mobx';
import { CollectionModel, getInitialCollectionModel, linearizeCollection } from '@/shared/lib/collection';
import { ILocalStore } from '@/shared/lib/hooks';
import { CartProduct, Product } from '@/shared/types/Products';

type PrivateFields = '_cartItems' | '_totalAmount';

class CartStore implements ILocalStore {
  private _cartItems: CollectionModel<number | string, CartProduct> = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : getInitialCollectionModel();

  private _totalAmount: number = 0;

  constructor() {
    // makeAutoObservable(this, {}, { autoBind: true, deep: false });

    makeObservable<CartStore, PrivateFields>(this, {
      _cartItems: observable,
      _totalAmount: observable,
      addToCart: action.bound,
      deleteFromCart: action.bound,
      updateTotalAmount: action.bound,
      cartItems: computed,
      totalAmount: computed,
    });
    this.updateTotalAmount();
  }

  get cartItems(): CartProduct[] {
    return linearizeCollection(this._cartItems);
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  addToCart(product: Product) {
    const itemIndex = this._cartItems.order.find((id) => id === product.id);
    const cartProduct = {
      ...product,
      quantity: 1,
    };
    if (itemIndex !== undefined) {
      set(this._cartItems.entities[product.id], 'quantity', (this._cartItems.entities[product.id].quantity += 1));
    } else {
      set(this._cartItems.entities, product.id, cartProduct);
      this._cartItems.order.push(product.id);
    }

    this.updateTotalAmount();
    localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
  }

  deleteFromCart(product: Product) {
    const itemIndex = this._cartItems.order.find((id) => id === product.id);
    console.log(this.cartItems);

    if (Number(itemIndex) >= 0) {
      remove(this._cartItems.entities, String(product.id));
      this._cartItems.order.splice(Number(itemIndex), 1);
      console.log(this.cartItems);
    }
    this.updateTotalAmount();
    localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
  }

  updateTotalAmount() {
    let total = 0;
    linearizeCollection(this._cartItems).forEach((item) => {
      total += item.price * item.quantity;
    });
    this._totalAmount = total;
  }

  destroy(): void {}
}

export default CartStore;
