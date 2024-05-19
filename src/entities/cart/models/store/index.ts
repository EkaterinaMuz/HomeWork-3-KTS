import { action, computed, makeObservable, observable, set, toJS } from 'mobx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProduct, Product } from '@/entities/products/types';
import { CollectionModel, getInitialCollectionModel, linearizeCollection } from '@/shared/lib/collection';
import { ILocalStore } from '@/shared/lib/hooks';

type PrivateFields = '_cartItems' | '_totalAmount';

class CartStore implements ILocalStore {
  private _cartItems: CollectionModel<number | string, CartProduct> = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : getInitialCollectionModel();

  private _totalAmount: number = 0;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cartItems: observable,
      _totalAmount: observable,
      addToCart: action.bound,
      deleteFromCart: action.bound,
      updateTotalAmount: action.bound,
      cartItems: computed,
      totalAmount: computed,
      isAdded: action.bound,
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
      const cartItems = toJS(this._cartItems);
      cartItems.entities[product.id] = cartProduct;
      cartItems.order.push(product.id);
      this._cartItems = cartItems;
    }
    toast(`${product.title} added to your cart!`);
    this.updateTotalAmount();
    localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
  }

  deleteFromCart(product: Product) {
    const cartItems = toJS(this._cartItems);
    const itemIndex = cartItems.order.findIndex((id) => id === product.id);
    if (itemIndex >= 0) {
      delete cartItems.entities[product.id];
      cartItems.order.splice(itemIndex, 1);
      this._cartItems = cartItems;
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
