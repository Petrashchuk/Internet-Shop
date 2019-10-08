import {Component, OnInit} from '@angular/core';
import {ICategory} from '../../shared/interfaces/category.inerfaces';
import {CategoryServiceService} from '../../shared/services/category-service.service';
import {NewCategoryClass} from '../../shared/classes/new-category.class';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  arrCategory: Array<any> = [];
  category;
  url: string;
  editId: number;

  constructor(private categoryServic: CategoryServiceService) {
    this.url = 'http://localhost:3000/category';
  }


  ngOnInit() {
    this.categoryServic.getProductsCategory().subscribe(data => {
      this.arrCategory = data;
      console.log(this.arrCategory);
    })
  }


  public isAddProducts(): void {
    const category: ICategory = new NewCategoryClass(
      1,
      this.category,
    );
    this.category = '';
    if (this.arrCategory.length !== 0) {
      category.id = this.arrCategory.slice(-1)[0].id + 1;
    }
    this.categoryServic.setProductsCategory(category).subscribe(() => {
      this.getProductsCategory();
    });

  }

  private getProductsCategory(): void {
    this.categoryServic.getProductsCategory().subscribe(data => {
        this.arrCategory = data;
      },
      error1 => {
        console.log(error1);
      });
  }

  deleteCategory(product: ICategory) {
    this.categoryServic.delProductCategory(product.id).subscribe(() => {
      this.getProductsCategory();
    })
  }

  edCategory(category: ICategory) {
    this.editId = category.id;
    this.category = category.name;
    this.categoryServic.editProductCategory(category).subscribe(() => {
      this.getProductsCategory();
    })
  }

}
