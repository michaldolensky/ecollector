// noinspection ES6UnusedImports
/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String'];
  perex: Scalars['String'];
  site: Site;
  siteId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};


export type CategoryItemsArgs = {
  filter?: InputMaybe<ItemFilterInput>;
  siteId: Scalars['Int'];
};

export type CategoryFilterInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryInput = {
  items?: InputMaybe<Array<InputMaybe<ItemInput>>>;
  name: Scalars['String'];
  perex: Scalars['String'];
  site: SiteInput;
  siteId: Scalars['Float'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
  perex: Scalars['String'];
};

export type CreateItemInput = {
  categoryId: Scalars['Int'];
  internalNumber: Scalars['String'];
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
};

export type CreateParameterInput = {
  name: Scalars['String'];
  type: ParameterType;
};

export type CreateSiteInput = {
  name: Scalars['String'];
};

export type DeleteCategoryInput = {
  categoryId: Scalars['Int'];
};

export type DeleteImageInput = {
  id: Scalars['Int'];
};

export type DeleteItemInput = {
  itemId: Scalars['Int'];
};

export type DeleteParameterInput = {
  parameterId: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['DateTime'];
  filename: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  itemId: Scalars['Float'];
  main: Scalars['Boolean'];
  originalName: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ImageInput = {
  filename: Scalars['String'];
  item: ItemInput;
  itemId: Scalars['Float'];
  main: Scalars['Boolean'];
  originalName: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Float'];
};

export type Item = {
  __typename?: 'Item';
  category: Category;
  categoryId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<Image>>>;
  internalNumber: Scalars['String'];
  itemParameters: Array<ItemParameter>;
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
  site: Site;
  updatedAt: Scalars['DateTime'];
};


export type ItemImagesArgs = {
  itemId?: InputMaybe<Scalars['Int']>;
  main?: InputMaybe<Scalars['Boolean']>;
};

export type ItemFilterInput = {
  categoryId?: InputMaybe<Scalars['Int']>;
  internalNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  numberForExchange?: InputMaybe<Scalars['Int']>;
  numberInCollection?: InputMaybe<Scalars['Int']>;
};

export type ItemInput = {
  category: CategoryInput;
  categoryId: Scalars['Int'];
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  internalNumber: Scalars['String'];
  itemParameters: Array<ItemParameterInput>;
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
  site: SiteInput;
};

export type ItemParameter = {
  __typename?: 'ItemParameter';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  item: Item;
  itemId: Scalars['Float'];
  parameter: Parameter;
  parameterId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type ItemParameterInput = {
  item: ItemInput;
  itemId: Scalars['Float'];
  parameter: ParameterInput;
  parameterId: Scalars['Float'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createItem: Item;
  createParameter: Parameter;
  createSite: Site;
  removeCategory: Category;
  removeImage: Image;
  removeItem: Item;
  removeParameter: Parameter;
  removeSite: Site;
  removeUser: User;
  updateCategory: Category;
  updateItem: Item;
  updateParameter: Parameter;
  updateSite: Site;
  updateUser: User;
  uploadFile: Scalars['Boolean'];
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
  siteId: Scalars['Int'];
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
  siteId: Scalars['Int'];
};


export type MutationCreateParameterArgs = {
  createParameterInput: CreateParameterInput;
  siteId: Scalars['Int'];
};


export type MutationCreateSiteArgs = {
  createSiteInput: CreateSiteInput;
};


export type MutationRemoveCategoryArgs = {
  deleteCategoryInput: DeleteCategoryInput;
  siteId: Scalars['Int'];
};


export type MutationRemoveImageArgs = {
  deleteImageInput: DeleteImageInput;
  siteId: Scalars['Int'];
};


export type MutationRemoveItemArgs = {
  deleteItemInput: DeleteItemInput;
  siteId: Scalars['Int'];
};


export type MutationRemoveParameterArgs = {
  deleteParameterInput: DeleteParameterInput;
  siteId: Scalars['Int'];
};


export type MutationRemoveSiteArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  siteId: Scalars['Int'];
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateItemArgs = {
  siteId: Scalars['Int'];
  updateItemInput: UpdateItemInput;
};


export type MutationUpdateParameterArgs = {
  siteId: Scalars['Int'];
  updateParameterInput: UpdateParameterInput;
};


export type MutationUpdateSiteArgs = {
  siteId: Scalars['Int'];
  updateSiteInput: UpdateSiteInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  files: Array<Scalars['Upload']>;
};

export type Parameter = {
  __typename?: 'Parameter';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  site: Site;
  siteId: Scalars['Float'];
  type: ParameterType;
  updatedAt: Scalars['DateTime'];
};

export type ParameterFilterInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ParameterInput = {
  name: Scalars['String'];
  site: SiteInput;
  siteId: Scalars['Float'];
  type: ParameterType;
};

export enum ParameterType {
  Text = 'TEXT'
}

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  image: Image;
  images: Array<Image>;
  item: Item;
  items: Array<Item>;
  parameter: Parameter;
  parameters: Array<Parameter>;
  site: Site;
  sites: Array<Site>;
  user: User;
  users: Array<User>;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilterInput>;
  siteId: Scalars['Int'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryImageArgs = {
  id: Scalars['Int'];
};


export type QueryImagesArgs = {
  itemId?: InputMaybe<Scalars['Int']>;
  main?: InputMaybe<Scalars['Boolean']>;
};


export type QueryItemArgs = {
  id: Scalars['Int'];
};


export type QueryItemsArgs = {
  filter?: InputMaybe<ItemFilterInput>;
  siteId: Scalars['Int'];
};


export type QueryParameterArgs = {
  id: Scalars['Int'];
};


export type QueryParametersArgs = {
  filter?: InputMaybe<ParameterFilterInput>;
  siteId: Scalars['Int'];
};


export type QuerySiteArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Site = {
  __typename?: 'Site';
  categories: Array<Category>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  items: Array<Item>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['Float'];
  parameters: Array<Parameter>;
  stats: SiteStats;
  updatedAt: Scalars['DateTime'];
};

export type SiteInput = {
  categories: Array<CategoryInput>;
  items: Array<ItemInput>;
  name: Scalars['String'];
  owner: UserInput;
  ownerId: Scalars['Float'];
  parameters: Array<ParameterInput>;
  stats: SiteStatsInput;
};

export type SiteStats = {
  __typename?: 'SiteStats';
  totalCategories: Scalars['Float'];
  totalItems: Scalars['Float'];
};

export type SiteStatsInput = {
  totalCategories: Scalars['Float'];
  totalItems: Scalars['Float'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  perex: Scalars['String'];
};

export type UpdateImageInput = {
  filename?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  itemId?: InputMaybe<Scalars['Int']>;
  main: Scalars['Boolean'];
  originalName?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
};

export type UpdateItemInput = {
  categoryId: Scalars['Int'];
  id: Scalars['Int'];
  images?: InputMaybe<Array<InputMaybe<UpdateImageInput>>>;
  internalNumber: Scalars['String'];
  itemParameters?: InputMaybe<Array<InputMaybe<UpdateItemParameterInput>>>;
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
};

export type UpdateItemParameterInput = {
  id?: InputMaybe<Scalars['Int']>;
  parameter?: InputMaybe<UpdateParameterInput>;
  value: Scalars['String'];
};

export type UpdateParameterInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  type: ParameterType;
};

export type UpdateSiteInput = {
  name: Scalars['String'];
};

export type UpdateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  role: Roles;
  sites?: Maybe<Array<Maybe<Site>>>;
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role: Roles;
  sites?: InputMaybe<Array<InputMaybe<SiteInput>>>;
};
