import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { AllUserManagmentComponent } from './all-user-managment/all-user-managment.component';
import { BuyGameComponent } from './buy-game/buy-game.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { ShowCategoryComponent } from './Category/show-category/show-category.component';
import { FundsComponent } from './funds/funds.component';


import { RegisterGameComponent } from './Game/register-game/register-game.component';
import { ShowGameComponent } from './Game/show-game/show-game.component';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ShowProductComponent } from './Product/show-product/show-product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  
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
  { path: "user-managment", component: UserManagmentComponent, 
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
    path: "Product/buy-product/:productId", component: BuyProductComponent,
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
    path: "catalog/:categoryId", component: CatalogComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
