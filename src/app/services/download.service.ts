
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Service } from '../models/service';
import { Observable, of } from 'rxjs';
import { Auth } from '../models/auth';
import { Checkout } from '../models/checkout';
import { Track } from '../models/tracks'
import { } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  controller = "downloads";
  httpOptions = {};
  constructor(private http: HttpClient, private auth: Auth) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token')
      })
    };
  }
  add($public_key: string, $checkout_id: number) {
    return this.http.post<Service>(Config.APIURL + this.controller + "/add", { public_key: $public_key, checkout_id: $checkout_id }, this.httpOptions);
  }
  check($public_key) {
    return this.http.post<Service>(Config.APIURL + this.controller + "/check", { public_key: $public_key }, this.httpOptions);
  }
  destroy($auth: Auth) {
    return this.http.post<Service>(Config.APIURL + this.controller + "/destroy", $auth, this.httpOptions);
  }
  file($track : Track, $public_key: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.get('token'),
        'Content-Type':'text',
      })
    };
    return this.http.post<string>(Config.APIURL + this.controller + "/file", { public_key: $public_key, track_id: $track.id, artist_id: $track.artist_id }, this.httpOptions);
  }
}
