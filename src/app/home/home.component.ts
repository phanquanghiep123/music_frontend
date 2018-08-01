import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Artist } from '../models/artist';
import { Track } from '../models/tracks';
import { ArtistService } from '../services/artist.service';
import { Service } from '../models/service'
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artist: Artist;
  service: Service;
  tracks: Track[];
  track: Track;
  indexTrack = 0;
  SoundSource = new Audio();
  @ViewChild('audioPlay') audioPlay: ElementRef;
  constructor(private titleService: Title, private artistService: ArtistService, private app: AppComponent) {
    this.SoundSource.onended =(() => {
      this.indexTrack++;
        if(typeof this.tracks[this.indexTrack] !== 'undefined'){
          this.track = this.tracks[this.indexTrack];
        }else{
          this.indexTrack = 0;
          this.track = this.tracks[this.indexTrack];
        }
        setTimeout(() => {
          this.SoundSource.pause();
          this.SoundSource.currentTime = 0;
          this.SoundSource.src = this.service.public_url + this.track.path;
          setTimeout(() => {
            this.SoundSource.play();
          }, 50);
        }, 50);
    });  
  }
  ngOnInit() {
    $('body').attr('class', 'page-track');
    this.titleService.setTitle('Home | Remyx');
    this.artistService.first().subscribe(data => {
      this.service = data;
      if (this.service.status) {
        this.artist = this.service.response;
        this.tracks = this.artist.tracks;
        this.track = this.tracks[0];
      }
      setTimeout(() => {
        this.app.hiddenLoading();
      }, 500);
      this.app.showLogopayment = false;
    });

  }
  PlayTrack() {
    if (this.artist.play) {
      this.SoundSource.pause();
      this.artist.play = false;
    }
    else {
      if(typeof this.tracks[this.indexTrack] !== 'undefined'){
        this.track = this.tracks[this.indexTrack];
      }else{
        this.indexTrack = 0;
        this.track = this.tracks[this.indexTrack];
      }
      this.SoundSource.src = this.service.public_url + this.track.path;
      setTimeout(() => {
        this.SoundSource.play()
        this.artist.play = true;
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
