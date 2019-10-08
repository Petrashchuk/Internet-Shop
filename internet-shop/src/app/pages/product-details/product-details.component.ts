import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../shared/services/product-service.service';
import {IProduct} from '../../shared/interfaces/product.inerfaces';
import {ProductDetailsService} from '../../shared/services/product-details.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  view: IProduct;
  viewID: number;

  styleforBtn: boolean = true;
  styleforBtn1: boolean = false;

  status: boolean = true;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;

  constructor(private ProductDetailsService: ProductDetailsService,
              private route: ActivatedRoute, private router: Router) {
    this.getDeatils();
  }

  buyNow() {
    this.ProductDetailsService.ordersStream.next(this.view);
  }

  ngOnInit() {
  }

  // slides = [
  //   {img: '../watch../assets/img/1.jpg'},
  //   // {img: "../assets/images/2.jpg"},
  //   // {img: "../assets/images/3.jpg"},
  //   // {img: "../assets/images/4.jpg"},
  //   // {img: "../assets/images/5.jpg"},
  //   // {img: "../assets/images/6.jpg"},
  //   // {img: "../assets/images/7.jpg"},
  //   // {img: "../assets/images/8.jpg"},
  //   // {img: "../assets/images/9.jpg"},
  //   // {img: "../assets/images/10.jpg"},
  //   // {img: "../assets/images/11.jpg"},
  //   // {img: "../assets/images/12.jpg"}
  // ]
  //
  // slideConfig = {
  //   'slidesToShow': 3,
  //   'slidesToScroll': 1,
  //   'nextArrow': '<div  style="cursor: pointer;" class=\'nav-btn prev-slide\'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>',
  //   'prevArrow': '<div style="cursor: pointer;" class=\'nav-btn next-slide\'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>',
  //   'dots': true,
  //   'infinite': false
  // };
  //
  // addSlide() {
  //   this.slides.push(this.slides.length + 1);
  // }
  //
  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }
  //
  // slickInit(e) {
  //   console.log('slick initialized');
  // }
  //
  // breakpoint(e) {
  //   console.log('breakpoint');
  // }
  //
  // afterChange(e) {
  //   console.log('afterChange');
  // }
  //
  // beforeChange(e) {
  //   console.log('beforeChange');
  // }


  clickTabs(event) {
    if (event.target.id === 'nav-home-tab') {
      this.status = true;
      this.status1 = false;
      this.status2 = false;
      this.status3 = false;
    }
    else if (event.target.id === 'nav-profile-tab') {
      this.status = false;
      this.status1 = true;
      this.status2 = false;
      this.status3 = false;
    }
    else if (event.target.id === 'nav-contact-tab') {
      this.status = false;
      this.status1 = false;
      this.status2 = true;
      this.status3 = false;
    }
    else {
      this.status = false;
      this.status1 = false;
      this.status2 = false;
      this.status3 = true;
    }
  }

  showWriteData(target) {
    if (target.firstChild.innerHTML === 'DETAILS') {
      this.status = !this.status;
    }
    else if (target.firstChild.innerHTML === 'SHIPPING INFO') {
      this.status1 = !this.status1;
    }
    else if (target.firstChild.innerHTML === 'PAYMANT OPTIONS') {
      this.status2 = !this.status2;
    }
    else if (target.firstChild.innerHTML === 'RETURNS') {
      this.status3 = !this.status3;
    }
  }

  showbyText(target) {
    if (target.innerHTML === 'RETURNS') {
      this.status3 = !this.status3;
    }
    else if (target.innerHTML === 'PAYMANT OPTIONS') {
      this.status2 = !this.status2;
    }
    else if (target.innerHTML === 'SHIPPING INFO') {
      this.status1 = !this.status1;
    }
    else {
      this.status = !this.status;
    }
  }

  showbyPhoto(target) {
    if (target.id === 'returns') {
      this.status3 = !this.status3;
    }
    else if (target.id === 'paymant') {
      this.status2 = !this.status2;
    }
    else if (target.innerHTML === 'shipping') {
      this.status1 = !this.status1;
    }
    else {
      this.status = !this.status;
    }
  }

  public getDeatils(): void {
    this.viewID = Number(this.route.snapshot.paramMap.get('id'));
    this.ProductDetailsService.getProuctDetails(this.viewID).subscribe(data => {
      console.log(data);
      if (!data.size) {
        this.styleforBtn1 = true;
      }
      this.view = data;
    }, error => {
      console.log(error);
    });
  }


  clickOnbtn() {
    if (this.view['anotherSize']) {
      this.styleforBtn = !this.styleforBtn;
      this.styleforBtn1 = !this.styleforBtn!;
    }
    else if (!this.view.size) {
      this.styleforBtn1 = true;
    }
  }

}
