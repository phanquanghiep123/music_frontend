import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
import { DownloadService } from '../services/download.service';
import { Auth } from '../models/auth';
import { Service } from '../models/service';
import { Artist } from '../models/artist';
import { Track } from '../models/tracks';
import { Config } from '../config';
import { Download } from '../models/download';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  service: Service;
  artists: Artist[];
  artist: Artist;
  track: Track;
  tracks: Track[];
  hoursDownload = 0;
  download: Download;
  constructor(
    private titleService: Title,
    private app: AppComponent,
    private downloadService: DownloadService,
    private auth: Auth,
    private router: Router
  ) {
    this.app.loading = true;
  }
  ngOnInit() {
    $('body').attr('class','page-download');
    this.titleService.setTitle('Download Artist | Remyx');
    this.downloadService.check(this.auth.public_key).subscribe(
      data => {
        this.service = data;
        if (this.service.status) {
          this.artists = this.service.response;
          this.tracks = this.service.response.tracks;
          this.download = this.service.response.download;
          this.hoursDownload = this.download.diffTime;
        } else {
          alert(this.service.messege);
          if (this.service.redirect) {
            this.router.navigate([this.service.response]);
          }
        }
        this.app.loading = false;
      },
      error => {
        this.app.loading = false;
      }
    );
  }
  downloadfile($track: Track) {
    var _this = this;
    _this.app.loading = true;
    this.dataURItoBlob(Config.APIURL + 'downloads/file?public_key=' + _this.auth.public_key + '&track_id=' + $track.id + '&artist_id=' + $track.artist_id + '', function (file) {
      var binary = atob(file.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      var dataBit = new Blob([new Uint8Array(array)], { type: 'audio/' + $track.extension + '' });
      var url = URL.createObjectURL(dataBit);
      var link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', $track.name + '.' + $track.extension);
      document.getElementsByTagName('body')[0].appendChild(link);
      // Firefox
      if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        link.dispatchEvent(event);
      }
      // IE
      else if (link.click) {
        link.click();
      }
      link.parentNode.removeChild(link);
      _this.app.loading = false;
    });
  }
  formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' Bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MB';
    else return (bytes / 1073741824).toFixed(3) + ' GB';
  }
  dataURItoBlob(dataUrl, callback) {
    var req = new XMLHttpRequest;
    var _this = this;
    req.open('GET', dataUrl);
    req.onload = function fileLoaded(e) {
      callback(this.response);
    };
    try {
      req.send();
    } catch (err) {
      _this.app.loading = false;
    }

  }





}
