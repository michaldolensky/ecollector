import { CategoryInterface } from 'src/types/category.interface';

export interface ItemInterface {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
  category:CategoryInterface
}
