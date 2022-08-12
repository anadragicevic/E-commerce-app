import { ProductInfoComponent } from './product-info/product-info.component';
import { ProtectGuard } from './guard/protect.guard';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SupportComponent } from './support/support.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { LoginComponent } from './login/login.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'login', component: LoginComponent},

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [ProtectGuard],
    children: [
      { path: 'products', component: ProductsComponent},
      { path: 'manage-products', component: ManageProductsComponent},
      { path: 'manage-products/new', component: ProductFormComponent},
      { path: 'manage-products/:id', component: ProductFormComponent},
      { path: 'product-form', component: ProductFormComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      { path: 'check-out', component: CheckOutComponent},
      { path: 'order-success', component: OrderSuccessComponent},
      { path: 'my-orders', component: MyOrdersComponent},
      { path: 'favorites', component: FavoritesComponent},
      { path: 'support', component: SupportComponent},
      { path: 'view-order/:id', component: ViewOrderComponent},
      { path: 'product-info/:id', component: ProductInfoComponent}
    ]
  }
 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
