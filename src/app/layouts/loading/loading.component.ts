import { Component, OnInit, Input} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean = true;
  constructor() {

  }
  ngOnInit() { 
  }
  hiddenloadding () {
    $("#apploading").animate({width:'74px'},500,function(){
      $(this).animate({height:'74px'},250);
    }); 
  }
  showloadding (){
    $("#apploading").animate({height:'100%'},500,function(){
      $(this).animate({width:'100%'},250);
    });
  }
}
