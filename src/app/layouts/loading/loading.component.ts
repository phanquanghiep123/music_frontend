import { Component, OnInit, Input} from '@angular/core';
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
      setTimeout(() => {
        this.loading = false;
        $("#apploading").hide();
        $("body").removeClass("open-loading");
      }, 1000);
    }
  }
  showloadding() {
    if (this.loading == false) {      
      $("body").addClass("open-loading");
      this.loading = true;
      $("#apploading").show();
    }
  }
}