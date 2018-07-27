import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Service } from '../models/service';
import { Checkout } from '../models/checkout';
import { Auth } from '../models/auth';
import { DownloadService } from '../services/download.service';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  queryParams: {};
  service: Service;
  coundown = 5;
  constructor(
    private titleService: Title,
    private app: AppComponent,
    private activatedRoute: ActivatedRoute,
    private checkout: Checkout,
    private router: Router,
    private downloadService: DownloadService,
    private auth : Auth
  ) {
    this.app.loading = true;
  }
  ngOnInit() { 
    $('body').attr('class', 'page-message page-success');
    this.titleService.setTitle('Thanks you | Remyx');
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    if (this.checkout.key == this.queryParams['key']) {
      this.auth.generator();
      this.auth.set(2);
      this.downloadService.add(this.auth.public_key,this.checkout.id).subscribe(
        data => {
          this.service = data;
          if(this.service.status){
            this.checkout.destroy();
            this.app.loading = false;   
            var down = setInterval(()=> {
              if(this.coundown > 0)
                this.coundown--;
              else {
                this.router.navigate(['/download']);
                clearInterval(down);
              } 
            },1000); 
          } else {
            alert(this.service.message);
            this.router.navigate(['/']);
          }
          this.app.loading = false;
        },
        error => {
          this.app.loading = false;
        }
      )
    } else {
      this.router.navigate['/'];
    }
  }

}
