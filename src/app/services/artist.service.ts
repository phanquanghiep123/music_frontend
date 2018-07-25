import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Service } from '../models/service';
import { Auth } from '../models/auth';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  controller = 'artists';
  httpOptions = {};
  constructor(private http: HttpClient, private auth: Auth) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token')
      })
    };
  }
  first ($slug ? : string){
    return this.http.post<Service>(Config.APIURL + this.controller + '/first',{slug : $slug }, this.httpOptions);
  }
}
