import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { Track } from '../models/tracks';
import { ArtistService } from '../services/artist.service';
import { Service } from '../models/service'
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
import { Currency } from '../models/currency';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'artist-home',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  service: Service;
  tracks: Track[];
  track: Track;
  indexTrack = 0;
  loadding = false;
  SoundSource = new Audio();
  currency: Currency;
  constructor(
    private titleService: Title,
    private route: Router,
    private router: ActivatedRoute,
    private artistService: ArtistService,
    private app: AppComponent,
  ) {
    this.app.loading = false;
    this.SoundSource.onended = (() => {
      this.indexTrack++;
      if (typeof this.tracks[this.indexTrack] !== 'undefined') {
        this.track = this.tracks[this.indexTrack];
      } else {
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
    const slug = this.router.snapshot.paramMap.get('slug');
    this.titleService.setTitle('Home | Remyx');
    $('body').attr('class', 'page-track');
    this.titleService.setTitle('Home | Remyx');
    this.artistService.first().subscribe(data => {
      this.service = data;
      if (this.service.status) {
        this.artist = this.service.response;
        this.tracks = this.artist.tracks;
        this.track = this.tracks[0];
      }
      $(".home-loading").removeClass("open-loading");
      setTimeout(function () {
        $(".home-loading").animate({ width: '112px' }, 500, function () {
          $(this).animate({ height: '112px' }, 250, function () {
            $("body").removeClass("open-loading");
          });
        });
      }, 1000);
    });
    if (slug == null) {
      this.artistService.first().subscribe(data => {
        this.service = data;
        if (this.service.status) {
          this.artist = this.service.response;
          this.route.navigate(['artist/' + this.artist.slug]);
        }
      });
    } else {
      this.artistService.first(slug).subscribe(data => {
        this.service = data;
        if (this.service.status) {
          this.artist = this.service.response;
          this.tracks = this.artist.tracks;
          this.track = this.tracks[0];
          var next = false;
          for (let i in this.artist.prices) {
            if (this.artist.prices[i].name == this.app.auth.country) {
              this.currency = this.artist.prices[i];
              next = true;
            }
          }
          if (!next) {
            this.currency = this.artist.prices[0];
          }
        }
        this.app.hiddenLoading();
      });
    }
  }
  PlayTrack() {
    if (this.artist.play) {
      this.SoundSource.pause();
      this.artist.play = false;
    }
    else {
      if (typeof this.tracks[this.indexTrack] !== 'undefined') {
        this.track = this.tracks[this.indexTrack];
      } else {
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
  hiddenLoadding() {
    this.loadding = false;
    $("body").addClass("open-loading");
    $(".home-loading").removeClass("open-loading");
    setTimeout(function () {
      $(".home-loading").animate({ width: '112px' }, 500, function () {
        $(this).animate({ height: '112px' }, 250, function () {
        });
      });
    }, 1000)
  }
  showLoadding() {
    this.loadding = true;
    $("body").addClass("open-loading");
    $(".home-loading").animate({ height: '100%' }, 250, function () {
      $(this).animate({ width: '100%' }, 500, function () {
        $(".home-loading").addClass("open-loading");
      });
    });
  }
  ngOnDestroy() {
    try {
      this.SoundSource.pause();
      this.SoundSource.currentTime = 0;
    } catch (error) { }
    this.app.loading = true;
    this.app.showLoading();
  }

}
