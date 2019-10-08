import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {WatchComponent} from './pages/watch/watch.component';
import {ContactComponent} from './pages/contact/contact.component';
import {SizeInformationComponent} from './pages/size-information/size-information.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {TermsComponent} from './pages/terms/terms.component';
import {OurStoryComponent} from './pages/our-story/our-story.component';

import {AdminComponent} from './admin/admin.component';
import {AdminProductComponent} from './admin/admin-product/admin-product.component';
import {AdminCategoryComponent} from './admin/admin-category/admin-category.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminGuardGuard} from "./admin-guard.guard";
import {UserComponent} from './user/user.component';

import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {MensComponent} from './pages/mens/mens.component';
import {WomensComponent} from './pages/womens/womens.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {CustomersEmailComponent} from './admin/customers-email/customers-email.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'mens', component: MensComponent},
      {path: 'womens', component: WomensComponent},
      {path: 'products/:id', component: ProductDetailsComponent},
      {path: 'home', component: HomeComponent},
      {path: 'watch', component: WatchComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'size_Info', component: SizeInformationComponent},
      {path: 'ret_policy', component: ReturnPolicyComponent},
      {path: 'privacy_policy', component: PrivacyPolicyComponent},
      {path: 'terms', component: TermsComponent},
      {path: 'our_story', component: OurStoryComponent},
      {path: 'check_out', component: CheckoutComponent},
      {path: '**', redirectTo: 'home'},
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuardGuard], children: [
      {path: '', redirectTo: 'category', pathMatch: 'full'},
      {path: 'products', component: AdminProductComponent},
      {path: 'category', component: AdminCategoryComponent},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'emails', component: CustomersEmailComponent}
    ]
  },
  {path: '**', redirectTo: 'user/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
