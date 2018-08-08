import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { Track } from '../models/tracks';
import { Checkout } from '../models/checkout';
import { PaymentService } from '../services/payment.service';
import { Service } from '../models/service';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  service: Service;
  artist: Artist;
  tracks: Track[];
  track: Track;
  isSubmitCheckout = 0;
  checkout: Checkout;
  constructor(
    private titleService: Title,
    private route: Router,
    private router: ActivatedRoute,
    private artistService: ArtistService,
    private app: AppComponent,
    private paymentService: PaymentService
  ) {
  }
  ngOnInit() {
    this.checkout = new Checkout();
    this.checkout.destroy();
    this.checkout = new Checkout();
    this.checkout.status = 1;
    const slug = this.router.snapshot.paramMap.get('slug');
    this.titleService.setTitle('Checkout | Remyx');
    $('body').attr('class', 'page-checkout');
    this.artistService.first(slug).subscribe(data => {
      this.service = data;
      if (this.service.status) {
        this.artist = this.service.response;
        this.tracks = this.artist.tracks;
        this.track = this.tracks[0];
        this.checkout.artist_id = this.artist.id;
        this.checkout.slug = this.artist.slug;
        var next = false;
        for (let i in this.artist.prices){
          if(this.artist.prices[i].value == this.app.auth.country){
            this.checkout.price  = this.artist.prices[i];
            next = true;
          }
        }
        if(!next){
          this.checkout.price  = this.artist.prices[0];
        }
        this.checkout.currency = this.checkout.price.id;
      }
      setTimeout(() => {
        this.app.hiddenLoading();
      }, 500);
      this.app.showLogopayment = true;
    });
  }
  OnSubmit(formCheckout) {
    this.isSubmitCheckout = 1;
    if (formCheckout.form.status != 'VALID') {
      window.scrollTo(0, 0);
      return false;
    }
    this.app.showLoading();
    this.paymentService.checkout(this.checkout).subscribe(
      data => {
        this.service = data;
        if (this.service.status) {
          for (let i in this.service.response){
            this.checkout[i] = this.service.response[i];
          }
          this.checkout.set();
          this.route.navigate(['/purchase']);
        }
        this.app.hiddenLoading();
      },
      error => {
        this.app.hiddenLoading();
      }
    )
    
  }
  ngOnDestroy() {
    this.app.showLoading();
  }
}
