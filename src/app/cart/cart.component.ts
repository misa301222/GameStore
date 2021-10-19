import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Models/user';
import { CartService } from '../services/cart.service';
import { HistoryService } from '../services/history.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private modalService: NgbModal, private router: Router, private userService: UserService,
    private historyService: HistoryService, private datePipe: DatePipe, private productService: ProductService) { }

  cartList: any;
  grandTotal: number;
  user: User = new User();

  ngOnInit(): void {
    this.getAllItems();
    this.getTotalPrice();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
  }

  getAllItems() {
    this.cartService.getProducts().subscribe(data => {
      this.cartList = data;
    });
  }

  removeItem(selectedProduct: any) {
    this.cartService.removeCartItem(selectedProduct);
    this.getAllItems();
    this.getTotalPrice();
  }

  removeAllItems() {
    this.cartService.removeAllCart();
  }

  getTotalPrice() {
    this.grandTotal = this.cartService.getTotalPrice();
  }

  shopNow(content) {
    console.log('shop');
    let email = JSON.stringify(this.user.email);
    let em = email.replace(/['"]+/g, '');

    let date = new Date();
    console.log(date);
    let dateString = this.datePipe.transform(date, 'yyyy-MM-dd hh:mm:ss');

    this.userService.removeFunds(em, this.grandTotal).subscribe(data => {
      console.log(JSON.stringify(data));
    })

    for (let cartElement of this.cartList) {
      this.saveHistory(cartElement.productId, cartElement.productName, cartElement.price, em, dateString);
      // ID AND 1 QUANTITY
      this.updateQuantityProduct(cartElement.productId, 1);
    }

    this.modalService.open(content);
    this.removeAllItems();
    this.grandTotal = 0;
  }

  saveHistory(productId: number, productName: string, price: number, email: string, buyDate: string) {
    return this.historyService.saveProduct(productId, productName, price, email, buyDate).subscribe(data => {
      console.log(JSON.stringify(data));
    })
  }

  updateQuantityProduct(productId: number, quantity: number) {
    console.log('up');
    return this.productService.updateProductQuantity(productId, quantity).subscribe(data => {
      console.log(JSON.stringify(data));
    })
  }

}
