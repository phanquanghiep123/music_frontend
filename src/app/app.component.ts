import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingComponent } from './layouts/loading/loading.component';
import { Auth } from './models/auth';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = true;
  showLogopayment = true;
  contry: string = null;
  auth : Auth;
  constructor(private titleService: Title, private loadingcomponent: LoadingComponent) {
    this.auth = new Auth();
    this.titleService.setTitle('Home | Remyx');
    this.showLoading();
  }
  hiddenLoading() {
    this.loadingcomponent.hiddenloadding();
  }
  showLoading() {
    this.loadingcomponent.showloadding();
  }
}
