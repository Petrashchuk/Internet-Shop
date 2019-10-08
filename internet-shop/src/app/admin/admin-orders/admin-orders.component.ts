import {Component, OnInit} from '@angular/core';
import {AddressProductService} from '../../shared/services/address-product.service';
import {ProductDetailsService} from '../../shared/services/product-details.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public order: any[] = [];
  public product: any;


  constructor(private addressProduct: AddressProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    debugger
    this.addressProduct.getFullOrders().subscribe(data => {
        data.forEach(item => {
          this.order = this.order.concat(item.orders);
        });
      },
      error1 => {
        console.log(error1);
      });
  }


  moreDetails(product) {
    console.log(product);
    this.product = product;
  }
}
