import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../shared/interfaces/product.inerfaces';
import {ProductServiceService} from '../../shared/services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsProduct: Array<IProduct> = [];

  constructor(private productsService: ProductServiceService) {
  }

  ngOnInit() {
    this.getProducts();
  }


  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      console.log(data);
      this.newsProduct = data.splice(-6, 6);
    });
  }
}
