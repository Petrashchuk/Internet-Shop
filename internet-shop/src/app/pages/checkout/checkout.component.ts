import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressProductService} from '../../shared/services/address-product.service';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ProductDetailsService} from '../../shared/services/product-details.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  show: boolean = false;
  show1: boolean = false;
  show2: boolean = false;

  getProduct: any = [];


  tax: number = 0;
  totalPrice: number = 0;
  fullOrders: object = {};

  addBlock: boolean = false;
  mustHaveLengthCheck: boolean = true;
  afterFirstStep: boolean = true;
  checkIfcheckDelivey: boolean = true;
  getTarget: any;

  selectedCountry: string;
  country$: any = [];
  arrOrders: Array<any> = [];


  sendOrdersObj: any = {};

  myForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    'fname': new FormControl('', [Validators.required]),
    'lname': new FormControl('', [Validators.required]),
    'phone_number': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    'address1': new FormControl('', [Validators.required]),
    'address2': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required]),
    'zipCode': new FormControl('', [Validators.required]),
    'country': new FormControl('', [Validators.required])
  });

  constructor(private addressProduct: AddressProductService,
              private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private prodDetails: ProductDetailsService,
              private productService: ProductDetailsService) {

  }

  showOrders: boolean = false;

  ngOnInit() {
    this.prodDetails.getProduct = [];
    if (JSON.parse(localStorage.getItem('product'))) {
      this.showOrders = true;
      this.getProduct = JSON.parse(localStorage.getItem('product'));
      this.getProduct.forEach(product => {
        this.totalPrice += product.price * product.count;
        this.tax += product.tax;
      });
      this.http.get('https://restcountries.eu/rest/v2/all').subscribe(data => {
        Object.values(data).forEach(ite => {
          this.country$.push(ite.name);
        });
      });
    }
  }

  showSuccess() {
    this.toastr.success('Your order sent', 'Success');
  }

  showWriteData(event) {
    if (event.target.firstChild.innerHTML === 'THE BASICS') {
      this.show = !this.show;
    }
    else if (event.target.firstChild.innerHTML === 'DELIVERY') {
      this.show1 = !this.show1;
    }
    else if (event.target.firstChild.innerHTML === 'PAYMANT') {
      this.show2 = !this.show2;
    }
  }

  showbyText(target) {
    if (target.innerHTML === 'THE BASICS') this.show = !this.show;
    else if (target.innerHTML === 'DELIVERY') this.show1 = !this.show1;
    else if (target.innerHTML === 'PAYMANT') this.show2 = !this.show2;
  }

  showbyPhoto(target) {
    if (target.id === 'basics') {
      this.show = !this.show;
    }
    else if (target.id === 'paymant') {
      this.show2 = !this.show2;
    }
    else if (target.innerHTML === 'delivery') {
      this.show1 = !this.show1;
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    if (window.scrollY > 235) {
      this.addBlock = true;
    }
    else {
      this.addBlock = false;
    }
  }

  paymant(target) {
    const paymant = {
      paymant: target.value
    };
    this.fullOrders = Object.assign(this.fullOrders, paymant);
    this.arrOrders.forEach(item => {
      Object.assign(item, paymant);
    });
    if (Object.keys(this.fullOrders).length === 15) {
      this.mustHaveLengthCheck = false;
    }
  }

  delivery() {
    this.checkIfcheckDelivey = false;
    this.show1 = !this.show1;
    this.show2 = true;
  }


  sendOrders() {
    this.show2 = !this.show2;
    if (this.getTarget) this.getTarget.checked = false;
    this.showSuccess();
    this.arrOrders.forEach(item => {
      this.sendOrdersObj.address.date = new Date();
    });
    this.addressProduct.setFullOrders(this.sendOrdersObj).subscribe();
    this.arrOrders = [];
    localStorage.removeItem('product');
    this.router.navigate(['/user/home']);
  }


  deliveryHome(target) {
    const deliver = {
      delivery: target.value
    };
    this.fullOrders = Object.assign(this.fullOrders, deliver);
    this.arrOrders.forEach(item => {
      Object.assign(item, deliver);
    });
    this.sendOrdersObj.orders = this.arrOrders;
  }

  buyNow() {
    if (this.myForm.valid) {
      this.show = !this.show;
      this.show1 = true;
      debugger
      JSON.parse(localStorage.getItem('product')).forEach((product) => {
        this.fullOrders = {...product};
        this.fullOrders['address'] = this.myForm.value;
        this.arrOrders.push(this.fullOrders);
        this.sendOrdersObj = {address: this.fullOrders['address'], orders: this.arrOrders};
      });
      this.afterFirstStep = false;
      this.myForm.reset();
    }
  }

  myCheckNews(target) {
    this.getTarget = target;
  }
}
