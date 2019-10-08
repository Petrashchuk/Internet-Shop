import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {ProductDetailsService} from '../../shared/services/product-details.service';
import {IProduct} from '../../shared/interfaces/product.inerfaces';
import {AddressProductService} from '../../shared/services/address-product.service';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public status: boolean = false;
  public st: boolean = false;
  public url: string;
  public id: number | string;
  public getProduct: IProduct[] = [];
  public wrapp: boolean = false;
  public tax: number = 0;
  public totalPrice = 0;

  constructor(private router: Router, private productService: ProductDetailsService, private adressProduct: AddressProductService) {
    if (JSON.parse(localStorage.getItem('product'))) {
      this.getProduct = this.getProduct.concat(JSON.parse(localStorage.getItem('product')));
      if (this.getProduct.length >= 3) {
        this.wrapp = true;
      }
      else {
        this.wrapp = false;
      }
      this.getProduct.forEach(item => {
        this.tax += item.tax * item.count;
        this.totalPrice += item.price * item.count;
      });
    }
    this.productService.ordersStream.subscribe(data => {
      if (this.getProduct.find(prod => prod.id === data.id)) {
        if (this.getProduct.length > 1) {
          this.getProduct.find(prod => prod.id === data.id).count++;
          this.tax = 0;
          this.totalPrice = 0;
          this.getProduct.forEach(item => {
            this.tax += item.tax * item.count;
            this.totalPrice += item.price * item.count;
          });
        }
        else {
          this.getProduct.find(prod => prod.id === data.id).count++;
          this.tax = this.getProduct.find(prod => prod.id === data.id).tax * this.getProduct.find(prod => prod.id === data.id).count;
          this.totalPrice = this.getProduct.find(prod => prod.id === data.id).price * this.getProduct.find(prod => prod.id === data.id).count;
          localStorage.setItem('product', JSON.stringify(this.getProduct));
        }
      }
      else {
        this.getProduct.push(data);
        localStorage.setItem('product', JSON.stringify(this.getProduct));
        this.tax += data.tax;
        this.totalPrice += data.price;
      }
    });
    this.checkUrl(location.pathname);
  }


  removeProduct(id: number) {
    const count = this.getProduct.find(data => data.id === id);
    const index = this.getProduct.findIndex(data => data.id === id);
    this.getProduct.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(this.getProduct));
    this.totalPrice -= count.price * count.count;
    this.tax -= count.tax * count.count;
    if (!this.getProduct.length) {
      localStorage.removeItem('product');
      this.totalPrice = null;
      this.tax = null;
    }
  }

  decProduct(id: number) {
    const countDec = this.getProduct.find(data => data.id === id);
    const index = this.getProduct.findIndex(data => data.id === id);
    if (countDec.count <= 1) {
      this.totalPrice -= countDec.price;
      this.tax -= countDec.tax;
      this.getProduct.splice(index, 1);
      localStorage.setItem('product', JSON.stringify(this.getProduct));
    }
    else {
      this.totalPrice -= countDec.price;
      this.tax -= countDec.tax;
      countDec.count--;
      localStorage.setItem('product', JSON.stringify(this.getProduct.splice(index, 1, countDec)));
    }
  }

  incProduct(id: number) {
    const countInc = this.getProduct.find(data => data.id === id);
    const index = this.getProduct.findIndex(data => data.id === id);
    countInc.count++;
    this.totalPrice += countInc.price;
    this.tax += countInc.tax;
    localStorage.setItem('product', JSON.stringify(this.getProduct.splice(index, 1, countInc)));
  }

  checkUrl(url: any) {
    const arr = this.router.routerState.snapshot.url.split('/');
    let id = arr[arr.length - 1];
    if (parseFloat(id)) {
      this.id = id;
    }
    if (url.match(`/user/products/${this.id}`)) {
      this.url = `/user/products/${this.id}`;
      this.st = true;
    }
    else if (url.match('/user/watch')) {
      this.url = '/user/watch';
      this.st = false;
    }
    else if (url.match('/user/home')) {
      this.url = '/user/home';
      this.st = false;
    }
    else if (url.match('/user/size_Info')) {
      this.url = '/user/size_Info';
      this.st = false;
    }
    else if (url.match('/user/contact')) {
      this.url = '/user/contact';
      this.st = false;
    }
    else if (url.match('/user/our_story')) {
      this.url = '/user/our_story';
      this.st = false;
    }
    else if (url.match('/user/mens')) {
      this.url = '/user/mens';
      this.st = false;
    }
    else if (url.match('/user/womens')) {
      this.url = '/user/womens';
      this.st = false;
    }
    else if (url.match('/user/check_out')) {
      this.url = '/user/check_out';
      this.st = false;
    }
    else if (url.match('/user/privacy_policy')) {
      this.url = '/user/privacy_policy';
      this.st = false;
    }
    else if (url.match('/user/ret_policy')) {
      this.url = '/user/ret_policy';
      this.st = false;
    }
    else if (url.match('/user/terms')) {
      this.url = '/user/terms';
      this.st = false;
    }

  }


  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.checkUrl(event.url);
      }
    });
  }

  @ViewChild('menu', {static: false}) menu;
  @ViewChild('anotherMenu', {static: false}) anotherMenu;
  @ViewChild('openMenu', {static: false}) openMenu;


  toggle() {
    this.openMenu.nativeElement.classList.toggle('open');
  }


  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    const myMenu = this.menu.nativeElement.children[0].children;
    const anotherMenu = this.anotherMenu.nativeElement;
    if (anotherMenu && window.scrollY > 1) {
      for (let i = 0; i < anotherMenu.lastChild.firstChild.children.length; i++) {
        anotherMenu.lastChild.firstChild.children[i].firstChild.classList.add('anotherA-shka');
      }

      // this.anotherMenu.nativeElement.classList.add('fixedClass');
      // this.anotherMenu.nativeElement.firstChild.classList.add('cremabtn');
      // this.anotherMenu.nativeElement.classList.add('anotherNav');
    }
    // else {
    //   for (let i = 0; i < anotherMenu.lastChild.firstChild.children.length; i++) {
    //     anotherMenu.lastChild.firstChild.children[i].firstChild.classList.remove('anotherA-shka');
    //   }
    //   this.anotherMenu.nativeElement.firstChild.classList.remove('cremabtn');
    //   this.anotherMenu.nativeElement.classList.remove('anotherNav');
    //   // this.anotherMenu.nativeElement.classList.remove('fixedClass');
    //   this.textD = false;
    //
    // }

    if (window.scrollY > 1) {
      for (let i = 0; i < myMenu.length; i++) {
        myMenu[1].firstChild.firstChild.classList.add('a-shka');
        myMenu[i].firstChild.classList.add('a-shka');

      }
      this.status = true;
      this.menu.nativeElement.classList.add('fixedClass');
    }
    else {
      this.status = false;
      for (let i = 0; i < myMenu.length; i++) {
        myMenu[i].firstChild.classList.remove('a-shka');
        myMenu[1].firstChild.firstChild.classList.remove('a-shka');
      }
      this.menu.nativeElement.classList.remove('fixedClass');
    }
  }


  checkOut(product) {
    this.router.navigate(['/user/check_out']);
  }

  backTo() {
    this.router.navigate(['/user/home']);
  }

  ngOnDestroy() {
  }
}
