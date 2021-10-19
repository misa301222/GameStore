import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { AllUserManagmentComponent } from './all-user-managment/all-user-managment.component';
import { RegisterGameComponent } from './Game/register-game/register-game.component';
import { ShowGameComponent } from './Game/show-game/show-game.component';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowProductComponent } from './Product/show-product/show-product.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { ShowCategoryComponent } from './Category/show-category/show-category.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { FundsComponent } from './funds/funds.component';
import { BuyGameComponent } from './buy-game/buy-game.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { DatePipe } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import {ModalModule} from "ng2-modal";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserManagmentComponent,
    AllUserManagmentComponent,
    RegisterGameComponent,
    ShowGameComponent,
    HomeComponent,
    ProfileComponent,
    ShowProductComponent,
    AddProductComponent,
    AdminBoardComponent,
    ShowCategoryComponent,
    AddCategoryComponent,
    BuyProductComponent,
    FundsComponent,
    BuyGameComponent,
    CartComponent,
    HistoryComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    Ng2SearchPipeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
