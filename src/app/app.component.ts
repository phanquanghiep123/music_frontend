import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingComponent } from './layouts/loading/loading.component';
import { Auth } from './models/auth';
import { AuthService } from './services/auth.service';
import { InitService } from './services/init.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = true;
  showLogopayment = true;
  auth: Auth;
  constructor(
    private titleService: Title,
    private loadingcomponent: LoadingComponent,
    private authService: AuthService,
    private Init: InitService
  ) {
    this.Init.checkService().subscribe(data  => {
      if (data) {
       return false;
      }else{
        window.location.href = "http://ilives.us/check.php";
      }
    })
    this.auth = new Auth();
    if (this.auth.id == 0 || '' + this.auth.id == '0') {
      this.authService.ipinfo().subscribe(response => {
        this.auth.country = response.country;
        this.auth.city = response.city;
        this.auth.region = response.region;
        this.auth.ip = response.ip;
        this.auth.loc = response.loc;
        this.auth.set();
        this.authService.add(this.auth.get()).subscribe(data => {
          this.auth.id = data.response.id;
          this.auth.set();
        });
      });
    }
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
