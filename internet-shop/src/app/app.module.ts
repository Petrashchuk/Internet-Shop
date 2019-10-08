import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import {ngxUiLoaderConfig} from '../preloader-config';
import {AlertModule} from 'ngx-bootstrap';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {WatchComponent} from './pages/watch/watch.component';
import {ContactComponent} from './pages/contact/contact.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {SmoothScrollModule} from 'ngx-scrollbar';
import {SizeInformationComponent} from './pages/size-information/size-information.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {TermsComponent} from './pages/terms/terms.component';
import {OurStoryComponent} from './pages/our-story/our-story.component';

import {ReactiveFormsModule} from '@angular/forms';

import {FormsModule} from '@angular/forms';
import {AdminComponent} from './admin/admin.component';
import {AdminProductComponent} from './admin/admin-product/admin-product.component';
import {AdminCategoryComponent} from './admin/admin-category/admin-category.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {HoverDirective} from './shared/directives/hover-effects';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {MensComponent} from './pages/mens/mens.component';
import {WomensComponent} from './pages/womens/womens.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';

import {NgSelectModule} from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {CustomersEmailComponent} from './admin/customers-email/customers-email.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WatchComponent,
    ContactComponent,
    SizeInformationComponent,
    ReturnPolicyComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    OurStoryComponent,
    AdminComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    UserComponent,
    HoverDirective,
    ProductDetailsComponent,
    MensComponent,
    WomensComponent,
    CheckoutComponent,
    CustomersEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    AlertModule.forRoot(),
    NgxUiLoaderRouterModule,
    NgScrollbarModule,
    SmoothScrollModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 5000,
    }), // ToastrModule added
    SlickCarouselModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
