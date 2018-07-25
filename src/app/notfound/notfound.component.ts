import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {AppComponent} from '../app.component';
declare var $: any;
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  constructor(private titleService: Title,private app : AppComponent) {
    this.app.loading = true;
  }
  ngOnInit() {
    $('body').attr('class','page-message page-error');
    this.titleService.setTitle('Oops | Remyx');
    setTimeout(() => {
      this.app.loading = false;
    }, 200);
  }

}
