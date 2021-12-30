import { Image } from 'src/types/graphql';

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
  numberForExchange: number
  numberInCollection: number
  updatedAt: Date
  createdAt: Date
  images: Image[]
}
