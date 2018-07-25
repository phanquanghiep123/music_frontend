import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Service } from '../models/service';
import { Observable, of } from 'rxjs';
import { Auth } from '../models/auth';
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  controller = 'musics';
  httpOptions = {};
  constructor(private http: HttpClient, private auth: Auth) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token')
      })
    };
  }
  create ($model? : any) :  Observable<Service>{
    return this.http.post<Service>(Config.APIURL + this.controller + '/create', $model, this.httpOptions);
  }
  gets($model?: {}): Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + '/gets', $model, this.httpOptions);
  }
  get ($id : any = 0) : Observable<Service>{
    return this.http.post<Service>(Config.APIURL + this.controller + '/edit', {'id' : $id} , this.httpOptions);
  }
  add($model: FormData): Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + '/store', $model, this.httpOptions);
  }
  update ($model :FormData) : Observable<Service> {
    return this.http.post<Service>(Config.APIURL + this.controller + '/update', $model, this.httpOptions);
  }
  destroy ($id:number){
    return this.http.post<Service>(Config.APIURL + this.controller + '/destroy',{id : $id }, this.httpOptions);
  }
  updateSort($index,$id){
    return this.http.post<Service>(Config.APIURL + this.controller + '/sort',{index: $index,id : $id }, this.httpOptions);
  }
}

