import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Service } from '../models/service';
import { Auth } from '../models/auth';
import {Checkout} from '../models/checkout';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  controller = 'payment';
  httpOptions = {};
  constructor(
    private http: HttpClient, 
    private auth: Auth
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token')
      })
    };
  }
  purchase ($info ? : {}){
    return this.http.post<Service>(Config.APIURL + this.controller + '/purchase', $info , this.httpOptions);
  }
  checkout ($checkout : Checkout){
    return this.http.post<Service>(Config.APIURL + this.controller + '/checkout',$checkout , this.httpOptions);
  }
}
