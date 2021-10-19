import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './Helper/constants';
import { Category } from './Models/category';
import { User } from './Models/user';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Store';
  categoryList : Category[] = [];

  constructor(private router: Router, private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onLogout() {
    localStorage.clear();
    localStorage.removeItem(Constants.USER_KEY);
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

  getCategories(){
    return this.categoryService.getAllCategories().subscribe(data => {
      console.log(data);
      this.categoryList = data;
    })
  }

  selectCatalog(categoryId : number){
    let url = '/catalog/' + categoryId;
    //this.router.navigate(['/catalog/', categoryId]);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => 
    this.router.navigate([url]));
  }

}
