import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {ThankyouComponent} from './thankyou/thankyou.component';
import {DownloadComponent} from './download/download.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout/:slug', component: CheckoutComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'download', component: DownloadComponent },
  { path: 'thanks', component: ThankyouComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
