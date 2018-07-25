

import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  queryParams: {};
  service: Service;
  coundown = 5;
  constructor(
    private titleService: Title,
    private app: AppComponent,
  ) {
    this.app.loading = true;
  }
  ngOnInit() { 
    $('body').attr('class', 'page-message page-success');
    this.titleService.setTitle('Privacy policy | Remyx');
    setTimeout(() => {
      this.app.loading = false;
    }, 200);
  }

}

