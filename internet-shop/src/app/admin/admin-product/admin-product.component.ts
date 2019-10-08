import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../shared/services/product-service.service';
import {IProduct} from '../../shared/interfaces/product.inerfaces';
import {NewProduct} from '../../shared/classes/new-products.class';
import {CategoryServiceService} from '../../shared/services/category-service.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs/internal/Observable';
import {map, finalize} from 'rxjs/operators';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  //More details//
  sku: string;
  case_thickness: string;
  dial_Color: string;
  movement: string;
  material: string;
  strap_With: string;
  adjustable_length: string;
  strap: string;
  strap_color: string;
  Interchangeable_straps: string;
  water_resistant: string;


  adminProducts: any;

  statusWomen: boolean = false;

  productName: string;
  productDesc: string;
  productPrice: number;
  productSize: string = '';
  anotherProductSize: string = '';
  count: number = 1;

  tax: number = 33.5;

  productImg: string;
  editId: number;

  editStatus: boolean = false;

  selectedCategory: string;

  ourSelect: any;

  sex: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private productsService: ProductServiceService,
              private categoryService: CategoryServiceService,
              private afStorage: AngularFireStorage) {
    this.getProducts()
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
      this.adminProducts = data;
    });
    this.getProducts();

    this.categoryService.getProductsCategory().subscribe(data => {
      this.ourSelect = data;
    })
  }

  choseCategory(event) {
    this.selectedCategory = event.target.options[event.target.selectedIndex].value;
  }

  private getProducts(): void {
    this.productsService.getProducts().subscribe(data => {
        this.adminProducts = data;
      },
      error1 => {
        console.log(error1);
      });
  }

  choseSex(event) {
    this.sex = event.target.options[event.target.selectedIndex].value;
    if (this.sex === 'Woman') {
      this.statusWomen = true;
    }
    else {
      this.statusWomen = false;
    }
  }

  setSizeWatch(event) {
    if (event.target.name === 'productSizeSmall') {
      this.productSize = event.target.value;
    }
    else {
      this.anotherProductSize = event.target.value;
    }
  }

  public isAddProducts(): void {
    const product: IProduct = new NewProduct(
      1,
      {id: 1, name: this.selectedCategory},
      this.productName,
      this.productDesc,
      this.productSize,
      this.productPrice,
      this.sex,
      {
        sku: this.sku,
        case_thickness: this.case_thickness,
        dial_Color: this.dial_Color,
        movement: this.movement,
        material: this.material,
        strap_With: this.strap_With,
        adjustable_length: this.adjustable_length,
        strap: this.strap,
        strap_color: this.strap_color,
        Interchangeable_straps: this.Interchangeable_straps,
        water_resistant: this.water_resistant
      },
      this.count,
      this.tax,
      this.anotherProductSize,
      this.productImg,
    );
    console.log(product);
    this.productName = '';
    this.productDesc = '';
    this.productSize = null;
    this.productPrice = null;
    this.sex = '';
    this.sku = '';
    this.case_thickness = ' ';
    this.dial_Color = ' ';
    this.movement = '';
    this.material = '';
    this.strap_With = '';
    this.adjustable_length = '';
    this.strap = '';
    this.strap_color = '';
    this.Interchangeable_straps = '';
    this.water_resistant = '';
    this.productImg = '';
    this.count = null;
    this.tax = null;
    if (this.adminProducts.length !== 0) {
      product.id = this.adminProducts.slice(-1)[0].id + 1;
      product.category.id = this.adminProducts.slice(-1)[0].id + 1;
    }
    this.productsService.setProducts(product).subscribe(() => {
      this.getProducts();
    });
  }

  deleteProduct(product: IProduct) {
    this.productsService.delProduct(product.id).subscribe(() => {
      this.getProducts();
    });
  }

  edProduct(product: IProduct) {
    this.editId = product.id;
    this.editStatus = true;
    this.productName = product.name;
    this.productDesc = product.description;
    this.productSize = product.size;
    this.productPrice = product.price;
    this.count = product.count;
    this.productsService.editProduct(product).subscribe(() => {
      this.getProducts();
    });
  }

  SaveProducts() {
    const obj: IProduct = new NewProduct(
      this.editId,
      {id: this.editId, name: this.selectedCategory},
      this.productName,
      this.productDesc,
      this.productSize,
      this.productPrice,
      this.sex,
      {
        sku: this.sku,
        case_thickness: this.case_thickness,
        dial_Color: this.dial_Color,
        movement: this.movement,
        material: this.material,
        strap_With: this.strap_With,
        adjustable_length: this.adjustable_length,
        strap: this.strap,
        strap_color: this.strap_color,
        Interchangeable_straps: this.Interchangeable_straps,
        water_resistant: this.water_resistant
      },
      this.count,
      this.tax,
      this.anotherProductSize,
      this.productImg,
    );
    this.productsService.editProduct(obj).subscribe(() => {
      this.getProducts();
    });
    this.editStatus = !this.editStatus;
    this.productName = '';
    this.productDesc = '';
    this.productSize = null;
    this.productPrice = null;
    this.sex = '',
      this.sku = '',
      this.case_thickness = ' ';
    this.dial_Color = ' ';
    this.movement = '';
    this.material = '';
    this.strap_With = '';
    this.adjustable_length = '';
    this.strap = '';
    this.strap_color = '';
    this.Interchangeable_straps = '';
    this.water_resistant = '';
    this.productImg = '';
    this.count = null;
    this.tax = null;
  }

  public upLoad(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.productImg = url;
        });
      })
    ).subscribe();
  }
}
