import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loading: boolean = true;
  donwUp: 0;
  constructor() { }
  ngOnInit() {
  }
  hiddenloadding() {
    if (this.loading == true) {
      this.loading = false;
      $('.loading').fadeOut();
      $("body .site").removeClass("open-loadding");
    }
  }
  showloadding() {
    if (this.loading == false) {
      this.loading = true;
      $("body .site").addClass("open-loadding");
      $('.loading').fadeIn();
    }
  }
}