import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './Components/register/register.component';
import { UserManagmentComponent } from './Components/user-managment/user-managment.component';
import { AllUserManagmentComponent } from './Components/all-user-managment/all-user-managment.component';
import { RegisterGameComponent } from './Components/Game/register-game/register-game.component';
import { ShowGameComponent } from './Components/Game/show-game/show-game.component';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ShowProductComponent } from './Components/Product/show-product/show-product.component';
import { AddProductComponent } from './Components/Product/add-product/add-product.component';
import { AdminBoardComponent } from './Components/admin-board/admin-board.component';
import { ShowCategoryComponent } from './Category/show-category/show-category.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { BuyProductComponent } from './Components/Product/buy-product/buy-product.component';
import { FundsComponent } from './Components/funds/funds.component';
import { BuyGameComponent } from './Components/Game/buy-game/buy-game.component';
import { CartComponent } from './Components/cart/cart.component';
import { HistoryComponent } from './Components/history/history.component';
import { DatePipe } from '@angular/common';
import { CatalogComponent } from './Components/catalog/catalog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { ContactComponent } from './Components/contact/contact.component';
import { HelpComponent } from './Components/help/help.component';
import { TeamComponent } from './Components/team/team.component';
import { SendApplicationComponent } from './Components/Application/send-application/send-application.component';
import { ShowApplicationComponent } from './Components/Application/show-application/show-application.component';
import { AboutThisAppComponent } from './Components/about-this-app/about-this-app.component';

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
    CatalogComponent,
    ContactComponent,
    HelpComponent,
    TeamComponent,
    SendApplicationComponent,
    ShowApplicationComponent,
    AboutThisAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
