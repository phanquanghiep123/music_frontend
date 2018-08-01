import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-thankyou',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  queryParams: {};
  service: Service;
  coundown = 5;
  constructor(
    private titleService: Title,
    private app: AppComponent,
  ) {
  }
  ngOnInit() { 
    $('body').attr('class', 'page-message page-success');
    this.titleService.setTitle('Privacy policy | Remyx');
    setTimeout(() => {
      this.app.showLoading()
    }, 500);
  }
  ngOnDestroy() {
    this.app.showLoading();
  }
}

