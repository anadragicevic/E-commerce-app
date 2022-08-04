import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductsComponent } from './products/products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SupportComponent } from './support/support.component';
import { ViewOrderComponent } from './view-order/view-order.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutUsComponent,
    StartPageComponent,
    LoginComponent,
    MyOrdersComponent,
    ProductsComponent,
    ManageProductsComponent,
    FooterComponent,
    ProductFormComponent,
    SearchComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    FavoritesComponent,
    SupportComponent,
    ViewOrderComponent,
 
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
