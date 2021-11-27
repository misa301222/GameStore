import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { bounceAnimation, fadeInDownAnimation } from 'angular-animations';
import { Constants } from './Helper/constants';
import { Category } from './Models/category';
import { User } from './Models/user';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInDownAnimation(),
    bounceAnimation()
  ]
})

export class AppComponent {
  title = 'Store';
  categoryList: Category[] = [];
  categoryListFooter: Category[] = [];
  email: string = "";
  isBouncing: boolean[] = [false, false, false, false, false, false];

  constructor(private router: Router, private categoryService: CategoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCategoriesForFooter();
    this.getEmail();
  }

  onLogout() {
    this.cartService.removeAllCart();
    localStorage.clear();
    localStorage.removeItem(Constants.USER_KEY);
  }

  toggleBouncing(index: number) {
    this.isBouncing[index] = !this.isBouncing[index];
  }

  get isUserLogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY));
  }

  get isAdmin(): boolean {
    return this.user.roles.indexOf("Admin") > -1;
  }

  get isUser(): boolean {
    return this.user.roles.indexOf("User") > -1 && !this.isAdmin;
  }

  getEmail() {
    if (this.user) {
      this.email = this.user.email.toString();
    } else {
      this.email = null;
    }
  }

  getCategories() {
    return this.categoryService.getAllCategories().subscribe(data => {
      this.categoryList = data;
    })
  }

  getCategoriesForFooter() {
    return this.categoryService.getAllCategories().subscribe(data => {
      this.categoryListFooter = data.slice(0, 3);
    })
  }

  selectCatalog(categoryId: number) {
    let url = '/catalog/' + categoryId;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}
