import {ICategory} from "../interfaces/category.inerfaces";


export class NewCategoryClass implements ICategory {
  constructor(
    public id: number,
    public name: string,
  ) {
  }
}
