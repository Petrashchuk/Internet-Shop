import {ICategory} from "./category.inerfaces";
import {IMoreInfo} from "./more-info";

export interface IProduct {
  id: number;
  category?: ICategory;
  name: string;
  description: string;
  size:string;
  price: number;
  sex: string;
  more_info?:IMoreInfo;
  img?:string;
  anotherSize?:string;
  count:number;
  tax:number;
}
