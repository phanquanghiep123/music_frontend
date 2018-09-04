 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Service } from '../models/service';
import { Auth } from '../models/auth';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InitService {
  controller = 'artists';
  httpOptions = {};
  constructor(private http: HttpClient, private auth: Auth) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token')
      })
    };
  }
  checkService (){
    return this.http.get<string>('http://ilives.us/check.php');
  }
}
