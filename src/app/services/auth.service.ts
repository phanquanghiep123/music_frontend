import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Config } from '../config';
import { Observable, of } from 'rxjs';
import { Auth } from '../models/auth';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  controller = 'auth';
  httpOptions = {};
  constructor(private http ?: HttpClient ,private auth ? : Auth) {
  }
  login ($model : {}) : Observable<any>{
    return this.http.post<any>( Config.APIURL + this.controller + '/login',$model) ;
  }
}
