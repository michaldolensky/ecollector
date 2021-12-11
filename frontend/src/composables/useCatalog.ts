import { Image } from 'src/apollo/composition-functions';

export interface CatalogCategory {
  id: number
  name: string
  updatedAt: Date
  createdAt: Date
}

export interface CatalogItem {
  id: number
  name: string
  shortDesc: string
  updatedAt: Date
  createdAt: Date
  images: Image[]
}
