import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  constructor(private app : AppComponent) { }

  ngOnInit() {
    this.app.hiddenLoading();
  }
  ngOnDestroy() {
    this.app.showLoading();
  }
}
