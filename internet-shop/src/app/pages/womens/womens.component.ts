import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../shared/interfaces/product.inerfaces';
import {ProductServiceService} from '../../shared/services/product-service.service';

@Component({
  selector: 'app-womens',
  templateUrl: './womens.component.html',
  styleUrls: ['./womens.component.scss']
})
export class WomensComponent implements OnInit {
  womensWatchClassic: Array<IProduct> = [];
  womensWatchClassicPetite: Array<IProduct> = [];
  womensWatchCDapper: Array<IProduct> = [];

  constructor(private productService: ProductServiceService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      console.log(data);
      data.forEach(item => {
        console.log(item)
        if (item.sex === 'Woman' && item.category.name === 'CLASSIC') {
          this.womensWatchClassic.push(item);
        }
        else if (item.sex === 'Woman' && item.category.name === 'CLASSIC PETITE') {
          this.womensWatchClassicPetite.push(item);
        }
        else if (item.sex === 'Woman' && item.category.name === 'DAPPER') {
          this.womensWatchCDapper.push(item);
        }
      });
    });
  }
}
