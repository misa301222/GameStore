import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public carItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.carItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.carItemList.push(product);
    this.productList.next(this.carItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.carItemList.map((a: any) => {
      grandTotal += a.price;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.carItemList.map((a: any, index: any) => {
      if (product.productId === a.productId) {
        this.carItemList.splice(index, 1);
      }
    })
  }

  removeAllCart() {
    this.carItemList = [];
    this.productList.next(this.carItemList);
  }

  getQuantityOfProduct(productId: number): number {
    let count = 0;
    this.carItemList.map((a: any) => {
      if (a.productId == productId) {
        count++;
      }
    })
    return count;
  }










}
