import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './layouts/loading/loading.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DownloadComponent } from './download/download.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { Service } from './models/service';
import { Checkout } from './models/checkout';
import { Auth } from './models/auth';
import { Artist } from './models/artist';
import { Track } from './models/tracks';
import { Download } from './models/download';
import { Login } from './models/login';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CancelComponent } from './cancel/cancel.component';
import { ArtistComponent } from './artist/artist.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    CheckoutComponent,
    LoadingComponent,
    PurchaseComponent,
    DownloadComponent,
    ThankyouComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    CancelComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpClient,Auth,Service,Checkout,Artist,Track,Download,Login,LoadingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
