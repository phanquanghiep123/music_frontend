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
  hoursDownload : string = '0';
  download: Download;
  hours = 0;
  munites = 0;
  seconds = 0;
  SoundSource = new Audio();
  constructor(
    private titleService: Title,
    private app: AppComponent,
    private downloadService: DownloadService,
    private auth: Auth,
    private router: Router
  ) {
    this.app.showLoading();
    this.SoundSource.onended = (() => {
        this.track.play = false
    })
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
          var argHour = this.hoursDownload.split(':');
          this.hours    = parseInt(argHour[0]);
          this.munites  = parseInt(argHour[1]);
          this.seconds  = parseInt(argHour[2]);
          var countdown = setInterval(() => {
            if(this.seconds > 0){
              this.seconds--;
            }else{
              this.seconds = 59;
              if(this.munites > 0){
                this.munites--;
              }else{
                this.munites = 59;
                if(this.hours > 0){
                  this.hours--;
                }else{
                  clearInterval(countdown);
                } 
              }
            }
          },1000);
        } else {
          alert(this.service.message);
          if (this.service.redirect) {
            this.router.navigate([this.service.response]);
          }
        }
        setTimeout (()=>{this.app.hiddenLoading();},500);
      },
      error => {
        this.app.hiddenLoading();
      }
    );
  }
  downloadfile($track: Track) {
    this.track = $track;
    this.track.download = true;
    var url = this.service.public_url + '/downloads/zipfiles?public_key=' + this.auth.public_key + '&track_id=' + $track.id + '&artist_id=' + $track.artist_id + '';
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
    this.track.download = false;
    
  }
  formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' Bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MB';
    else return (bytes / 1073741824).toFixed(3) + ' GB';
  }
  PlayTrack(track) {
    if(this.track && this.track.id != track.id){
      this.track.play = false;
    }
    this.track = track;
    if (this.track.play) {
      this.SoundSource.pause();
      this.track.play = false;
    }
    else {
      this.SoundSource.crossOrigin = 'anonymous';
      this.SoundSource.src = Config.APIURL + 'downloads/file?public_key=' + this.auth.public_key + '&track_id=' + track.id + '&artist_id=' + track.artist_id + '';
      console.log(Config.APIURL + 'downloads/file?public_key=' + this.auth.public_key + '&track_id=' + track.id + '&artist_id=' + track.artist_id + '');
      //this.SoundSource.src = this.service.public_url + this.track.path;
      setTimeout(() => {
        this.SoundSource.play();
        
        this.track.play = true;
        this.SoundSource.onended = (() => {
          this.track.play = false;
        })
      }, 50);
    }
  }
  ngOnDestroy() { 
    try {
      this.SoundSource.pause();
      this.SoundSource.currentTime = 0;
    } catch (error) {} 
    this.app.showLoading();
  }
}
