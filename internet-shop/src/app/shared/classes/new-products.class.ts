import {IProduct} from '../interfaces/product.inerfaces';
import {ICategory} from '../interfaces/category.inerfaces';
import {IMoreInfo} from '../interfaces/more-info';

export class NewProduct implements IProduct {
  constructor(
    public id: number,
    public category: ICategory,
    public name: string,
    public description: string,
    public size: string,
    public price: number,
    public sex: string,
    public moreInfo: IMoreInfo,
    public count: number,
    public tax: number,
    public anotherSize?: string,
    public img?: string,
  ) {
  }
}
