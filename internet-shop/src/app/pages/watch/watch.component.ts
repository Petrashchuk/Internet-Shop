import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../shared/services/product-service.service';
import {NewProduct} from '../../shared/classes/new-products.class';
import {IProduct} from '../../shared/interfaces/product.inerfaces';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  productsClassic: Array<IProduct> = [];
  productsClassicPetite: Array<IProduct> = [];
  productsDapper: Array<IProduct> = [];
  pageActual: number = 1;

  constructor(private productsService: ProductServiceService) {
    this.getProducts();
  }

  ngOnInit() {
  }


  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      console.log(data);
      data.forEach(product => {
        if (product.category.name === 'CLASSIC') {
          this.productsClassic.push(product);
        }
        else if (product.category.name === 'CLASSIC PETITE') {
          this.productsClassicPetite.push(product);
        }
        else{
          this.productsDapper.push(product);
        }
      });
    });
  }
}
