import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../shared/interfaces/product.inerfaces';
import {ProductServiceService} from '../../shared/services/product-service.service';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.scss']
})
export class MensComponent implements OnInit {
  mensWatchClassic: Array<IProduct> = [];
  mensWatchClassicPetite: Array<IProduct> = [];
  mensWatchCDapper: Array<IProduct> = [];

  constructor(private productService: ProductServiceService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      console.log(data);
      data.forEach(item => {
        if (item.sex === 'Man' && item.category.name === 'CLASSIC') {
          this.mensWatchClassic.push(item)
          console.log(this.mensWatchClassic);
        }
        else if (item.sex === 'Man' && item.category.name === 'CLASSIC PETITE') {
          this.mensWatchClassicPetite.push(item);
        }
        else if (item.sex === 'Man' && item.category.name === 'DAPPER') {
          this.mensWatchCDapper.push(item);
        }
      })
    })
  }

}
