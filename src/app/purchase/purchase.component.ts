import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { Track } from '../models/tracks';
import { Checkout } from '../models/checkout';
import { Service } from '../models/service';
import { AppComponent } from '../app.component';
import { PaymentService } from '../services/payment.service';
declare var $: any;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  artist: Artist;
  tracks: Track[];
  track: Track;
  checkout: Checkout;
  service: Service;
  checkoutInfo = {};
  @ViewChild('formCcavenue') formCcavenue: ElementRef;
  constructor(
    private titleService: Title,
    private route: Router,
    private artistService: ArtistService,
    private app: AppComponent,
    private paymentService: PaymentService
  ) {
    this.checkout = new Checkout();
    console.log(this.checkout);
    if (this.checkout.id == null || this.checkout.id < 1) {
      this.route.navigate(['/']);
    }
  }
  ngOnInit() {
    $('body').attr('class', 'page-confirm');
    this.titleService.setTitle('Confirm Purchase | Remyx');
    const slug = this.checkoutInfo['slug'];
    this.artistService.first(slug).subscribe(data => {
      this.service = data;
      if (this.service.status) {
        this.artist = this.service.response;
        this.tracks = this.artist.tracks;
        this.track = this.tracks[0];
        this.checkout.artist_id = this.artist.id;
        this.checkout.slug = this.artist.slug;
        for (var i in this.artist.prices) {
          if (this.artist.prices[i].id == this.checkout.currency) {
            this.checkout.price = this.artist.prices[i];
          }
        }
        this.checkout.status = 1;
        this.checkout.set();
      }
      setTimeout(() => {
        this.app.hiddenLoading();
      }, 500);
      this.app.showLogopayment = true;
    });
  }
  OnConfirm() {
    this.app.showLoading();
    this.paymentService.purchase(this.checkout).subscribe(
      data => {
        this.service = data;
        if (this.service.status) {
          if (this.service.redirect) {
            window.location.href = this.service.response;
          }
        } else {
          alert(this.service.message);
        }
      },
      error => {
        this.app.hiddenLoading();
      })
  }
  ngOnDestroy() {
    this.app.showLoading();
  }
}
