import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from './Components/admin-board/admin-board.component';
import { AllUserManagmentComponent } from './Components/all-user-managment/all-user-managment.component';
import { BuyGameComponent } from './Components/Game/buy-game/buy-game.component';
import { BuyProductComponent } from './Components/Product/buy-product/buy-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { CatalogComponent } from './Components/catalog/catalog.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { ShowCategoryComponent } from './Category/show-category/show-category.component';
import { FundsComponent } from './Components/funds/funds.component';


import { RegisterGameComponent } from './Components/Game/register-game/register-game.component';
import { ShowGameComponent } from './Components/Game/show-game/show-game.component';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './Components/history/history.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AddProductComponent } from './Components/Product/add-product/add-product.component';
import { ShowProductComponent } from './Components/Product/show-product/show-product.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserManagmentComponent } from './Components/user-managment/user-managment.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HelpComponent } from './Components/help/help.component';
import { TeamComponent } from './Components/team/team.component';
import { SendApplicationComponent } from './Components/Application/send-application/send-application.component';
import { ShowApplicationComponent } from './Components/Application/show-application/show-application.component';
import { AboutThisAppComponent } from './Components/about-this-app/about-this-app.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "help", component: HelpComponent },
  { path: "team", component: TeamComponent },
  { path: "send-application", component: SendApplicationComponent },
  { path: "catalog/:categoryId", component: CatalogComponent },
  { path: "Product/buy-product/:productId", component: BuyProductComponent },
  { path: "about-this-app", component: AboutThisAppComponent },
  {
    path: "admin-board", component: AdminBoardComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "show-product", component: ShowProductComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "add-category", component: AddCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "show-category", component: ShowCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "add-product", component: AddProductComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "user-managment", component: UserManagmentComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin', 'User']
    }
  },
  {
    path: "all-user-managment", component: AllUserManagmentComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "show-game", component: ShowGameComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "add-game", component: RegisterGameComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: "profile", component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin', 'User']
    }
  },
  {
    path: "Game/buy-game/:idGame", component: BuyGameComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin', 'User']
    }
  },
  {
    path: "funds", component: FundsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin', 'User']
    }
  },
  {
    path: "cart", component: CartComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin', 'User']
    }
  },
  {
    path: "history", component: HistoryComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin', 'User']
    }
  },
  {
    path: "show-application", component: ShowApplicationComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
