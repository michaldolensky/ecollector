/* eslint-disable */
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
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
  categoryId?: Maybe<Scalars['Int']>;
  siteId: Scalars['Int'];
};

export type CategoryInput = {
  items?: Maybe<Array<Maybe<ItemInput>>>;
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
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
  site: Site;
  updatedAt: Scalars['DateTime'];
};


export type ItemImagesArgs = {
  itemId?: Maybe<Scalars['Int']>;
  main?: Maybe<Scalars['Boolean']>;
};

export type ItemInput = {
  category: CategoryInput;
  categoryId: Scalars['Int'];
  images?: Maybe<Array<Maybe<ImageInput>>>;
  internalNumber: Scalars['String'];
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
  site: SiteInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createItem: Item;
  createSite: Site;
  removeCategory: Category;
  removeImage: Image;
  removeItem: Item;
  removeSite: Site;
  removeUser: User;
  updateCategory: Category;
  updateItem: Item;
  updateSite: Site;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
  siteId: Scalars['Int'];
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
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


export type MutationRemoveSiteArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
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


export type MutationUpdateSiteArgs = {
  updateSiteInput: UpdateSiteInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  getUserByEmail: User;
  image: Image;
  images: Array<Image>;
  item: Item;
  items: Array<Item>;
  site: Site;
  sites: Array<Site>;
  user: User;
  users: Array<User>;
};


export type QueryCategoriesArgs = {
  siteId: Scalars['Int'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryImageArgs = {
  id: Scalars['Int'];
};


export type QueryImagesArgs = {
  itemId?: Maybe<Scalars['Int']>;
  main?: Maybe<Scalars['Boolean']>;
};


export type QueryItemArgs = {
  id: Scalars['Int'];
};


export type QueryItemsArgs = {
  categoryId?: Maybe<Scalars['Int']>;
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
  stats: SiteStats;
  updatedAt: Scalars['DateTime'];
};

export type SiteInput = {
  categories: Array<CategoryInput>;
  items: Array<ItemInput>;
  name: Scalars['String'];
  owner: UserInput;
  ownerId: Scalars['Float'];
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
  filename?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  itemId?: Maybe<Scalars['Int']>;
  main: Scalars['Boolean'];
  originalName?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
};

export type UpdateItemInput = {
  categoryId: Scalars['Int'];
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<UpdateImageInput>>>;
  internalNumber: Scalars['String'];
  longDesc: Scalars['String'];
  name: Scalars['String'];
  numberForExchange: Scalars['Int'];
  numberInCollection: Scalars['Int'];
  shortDesc: Scalars['String'];
};

export type UpdateSiteInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UpdateUserInput = {
  firstName: Scalars['String'];
  id: Scalars['Int'];
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
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role: Roles;
  sites?: Maybe<Array<Maybe<SiteInput>>>;
};

export type GetCatalogueCategoriesQueryVariables = Exact<{
  siteId: Scalars['Int'];
}>;


export type GetCatalogueCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetCatalogItemsQueryVariables = Exact<{
  categoryId?: Maybe<Scalars['Int']>;
  siteId: Scalars['Int'];
}>;


export type GetCatalogItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, createdAt: any, shortDesc: string, images?: Array<{ __typename?: 'Image', path: string, main: boolean } | null | undefined> | null | undefined }> };

export type ItemQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, images?: Array<{ __typename?: 'Image', id: number, path: string, main: boolean } | null | undefined> | null | undefined } };

export type CreateItemMutationVariables = Exact<{
  createItemInput: CreateItemInput;
  siteId: Scalars['Int'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: number, categoryId: number, name: string } };

export type RemoveItemMutationVariables = Exact<{
  deleteItemInput: DeleteItemInput;
  siteId: Scalars['Int'];
}>;


export type RemoveItemMutation = { __typename?: 'Mutation', removeItem: { __typename?: 'Item', id: number } };

export type UpdateItemMutationVariables = Exact<{
  updateItemInput: UpdateItemInput;
  siteId: Scalars['Int'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, images?: Array<{ __typename?: 'Image', id: number, path: string, main: boolean } | null | undefined> | null | undefined } };

export type GetItemsQueryVariables = Exact<{
  siteId: Scalars['Int'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, createdAt: any, updatedAt: any, numberForExchange: number, numberInCollection: number, category: { __typename?: 'Category', name: string }, images?: Array<{ __typename?: 'Image', path: string, main: boolean } | null | undefined> | null | undefined }> };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
  siteId: Scalars['Int'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, perex: string } };

export type RemoveCategoryMutationVariables = Exact<{
  deleteCategoryInput: DeleteCategoryInput;
  siteId: Scalars['Int'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'Category', id: number } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
  siteId: Scalars['Int'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, perex: string } };

export type GetCategoriesQueryVariables = Exact<{
  siteId: Scalars['Int'];
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, createdAt: any, updatedAt: any, name: string }> };

export type GetCategoriesForSelectorQueryVariables = Exact<{
  siteId: Scalars['Int'];
}>;


export type GetCategoriesForSelectorQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: number, name: string, perex: string } };

export type RemoveImageMutationVariables = Exact<{
  deleteImageInput: DeleteImageInput;
  siteId: Scalars['Int'];
}>;


export type RemoveImageMutation = { __typename?: 'Mutation', removeImage: { __typename?: 'Image', id: number } };

export type SiteQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SiteQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: number, name: string, createdAt: any, updatedAt: any, stats: { __typename?: 'SiteStats', totalCategories: number, totalItems: number } } };

export type CreateSiteMutationVariables = Exact<{
  createSiteInput: CreateSiteInput;
}>;


export type CreateSiteMutation = { __typename?: 'Mutation', createSite: { __typename?: 'Site', id: number, name: string } };

export type RemoveSiteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveSiteMutation = { __typename?: 'Mutation', removeSite: { __typename?: 'Site', id: number } };

export type UpdateSiteMutationVariables = Exact<{
  updateSiteInput: UpdateSiteInput;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'Site', id: number, name: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: number } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstName?: string | null | undefined, lastName?: string | null | undefined } };


export const GetCatalogueCategoriesDocument = gql`
    query getCatalogueCategories($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    name
  }
}
    `;

/**
 * __useGetCatalogueCategoriesQuery__
 *
 * To run a query within a Vue component, call `useGetCatalogueCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogueCategoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCatalogueCategoriesQuery({
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCatalogueCategoriesQuery(variables: GetCatalogueCategoriesQueryVariables | VueCompositionApi.Ref<GetCatalogueCategoriesQueryVariables> | ReactiveFunction<GetCatalogueCategoriesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>(GetCatalogueCategoriesDocument, variables, options);
}
export type GetCatalogueCategoriesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>;
export const GetCatalogItemsDocument = gql`
    query getCatalogItems($categoryId: Int, $siteId: Int!) {
  items(categoryId: $categoryId, siteId: $siteId) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    createdAt
    shortDesc
    images(main: true) {
      path
      main
    }
  }
}
    `;

/**
 * __useGetCatalogItemsQuery__
 *
 * To run a query within a Vue component, call `useGetCatalogItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogItemsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCatalogItemsQuery({
 *   categoryId: // value for 'categoryId'
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCatalogItemsQuery(variables: GetCatalogItemsQueryVariables | VueCompositionApi.Ref<GetCatalogItemsQueryVariables> | ReactiveFunction<GetCatalogItemsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCatalogItemsQuery, GetCatalogItemsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>(GetCatalogItemsDocument, variables, options);
}
export type GetCatalogItemsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>;
export const ItemDocument = gql`
    query item($id: Int!) {
  item(id: $id) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    longDesc
    shortDesc
    categoryId
    updatedAt
    createdAt
    images {
      id
      path
      main
    }
  }
}
    `;

/**
 * __useItemQuery__
 *
 * To run a query within a Vue component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useItemQuery({
 *   id: // value for 'id'
 * });
 */
export function useItemQuery(variables: ItemQueryVariables | VueCompositionApi.Ref<ItemQueryVariables> | ReactiveFunction<ItemQueryVariables>, options: VueApolloComposable.UseQueryOptions<ItemQuery, ItemQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ItemQuery, ItemQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ItemQuery, ItemQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, variables, options);
}
export type ItemQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ItemQuery, ItemQueryVariables>;
export const CreateItemDocument = gql`
    mutation createItem($createItemInput: CreateItemInput!, $siteId: Int!) {
  createItem(createItemInput: $createItemInput, siteId: $siteId) {
    id
    categoryId
    name
  }
}
    `;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateItemMutation({
 *   variables: {
 *     createItemInput: // value for 'createItemInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useCreateItemMutation(options: VueApolloComposable.UseMutationOptions<CreateItemMutation, CreateItemMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateItemMutation, CreateItemMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
}
export type CreateItemMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateItemMutation, CreateItemMutationVariables>;
export const RemoveItemDocument = gql`
    mutation removeItem($deleteItemInput: DeleteItemInput!, $siteId: Int!) {
  removeItem(deleteItemInput: $deleteItemInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveItemMutation__
 *
 * To run a mutation, you first call `useRemoveItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveItemMutation({
 *   variables: {
 *     deleteItemInput: // value for 'deleteItemInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveItemMutation(options: VueApolloComposable.UseMutationOptions<RemoveItemMutation, RemoveItemMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveItemMutation, RemoveItemMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveItemMutation, RemoveItemMutationVariables>(RemoveItemDocument, options);
}
export type RemoveItemMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveItemMutation, RemoveItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation updateItem($updateItemInput: UpdateItemInput!, $siteId: Int!) {
  updateItem(updateItemInput: $updateItemInput, siteId: $siteId) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    longDesc
    shortDesc
    categoryId
    updatedAt
    createdAt
    images {
      id
      path
      main
    }
  }
}
    `;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateItemMutation({
 *   variables: {
 *     updateItemInput: // value for 'updateItemInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUpdateItemMutation(options: VueApolloComposable.UseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
}
export type UpdateItemMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateItemMutation, UpdateItemMutationVariables>;
export const GetItemsDocument = gql`
    query getItems($siteId: Int!) {
  items(siteId: $siteId) {
    id
    name
    createdAt
    updatedAt
    numberForExchange
    numberInCollection
    category {
      name
    }
    images(main: true) {
      path
      main
    }
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a Vue component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetItemsQuery({
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetItemsQuery(variables: GetItemsQueryVariables | VueCompositionApi.Ref<GetItemsQueryVariables> | ReactiveFunction<GetItemsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetItemsQuery, GetItemsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetItemsQuery, GetItemsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetItemsQuery, GetItemsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, variables, options);
}
export type GetItemsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetItemsQuery, GetItemsQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!, $siteId: Int!) {
  createCategory(createCategoryInput: $createCategoryInput, siteId: $siteId) {
    id
    name
    perex
  }
}
    `;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCategoryMutation({
 *   variables: {
 *     createCategoryInput: // value for 'createCategoryInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useCreateCategoryMutation(options: VueApolloComposable.UseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
}
export type CreateCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const RemoveCategoryDocument = gql`
    mutation removeCategory($deleteCategoryInput: DeleteCategoryInput!, $siteId: Int!) {
  removeCategory(deleteCategoryInput: $deleteCategoryInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveCategoryMutation({
 *   variables: {
 *     deleteCategoryInput: // value for 'deleteCategoryInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveCategoryMutation(options: VueApolloComposable.UseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
}
export type RemoveCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!, $siteId: Int!) {
  updateCategory(updateCategoryInput: $updateCategoryInput, siteId: $siteId) {
    id
    name
    perex
  }
}
    `;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateCategoryMutation({
 *   variables: {
 *     updateCategoryInput: // value for 'updateCategoryInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(options: VueApolloComposable.UseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const GetCategoriesDocument = gql`
    query getCategories($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    createdAt
    updatedAt
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a Vue component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoriesQuery({
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCategoriesQuery(variables: GetCategoriesQueryVariables | VueCompositionApi.Ref<GetCategoriesQueryVariables> | ReactiveFunction<GetCategoriesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoriesQuery, GetCategoriesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoriesQuery, GetCategoriesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoriesQuery, GetCategoriesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, variables, options);
}
export type GetCategoriesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoriesForSelectorDocument = gql`
    query getCategoriesForSelector($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesForSelectorQuery__
 *
 * To run a query within a Vue component, call `useGetCategoriesForSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesForSelectorQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoriesForSelectorQuery({
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCategoriesForSelectorQuery(variables: GetCategoriesForSelectorQueryVariables | VueCompositionApi.Ref<GetCategoriesForSelectorQueryVariables> | ReactiveFunction<GetCategoriesForSelectorQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>(GetCategoriesForSelectorDocument, variables, options);
}
export type GetCategoriesForSelectorQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>;
export const GetCategoryDocument = gql`
    query getCategory($id: Int!) {
  category(id: $id) {
    id
    name
    perex
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a Vue component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoryQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetCategoryQuery(variables: GetCategoryQueryVariables | VueCompositionApi.Ref<GetCategoryQueryVariables> | ReactiveFunction<GetCategoryQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, variables, options);
}
export type GetCategoryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoryQuery, GetCategoryQueryVariables>;
export const RemoveImageDocument = gql`
    mutation removeImage($deleteImageInput: DeleteImageInput!, $siteId: Int!) {
  removeImage(deleteImageInput: $deleteImageInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveImageMutation__
 *
 * To run a mutation, you first call `useRemoveImageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveImageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveImageMutation({
 *   variables: {
 *     deleteImageInput: // value for 'deleteImageInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveImageMutation(options: VueApolloComposable.UseMutationOptions<RemoveImageMutation, RemoveImageMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveImageMutation, RemoveImageMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveImageMutation, RemoveImageMutationVariables>(RemoveImageDocument, options);
}
export type RemoveImageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveImageMutation, RemoveImageMutationVariables>;
export const SiteDocument = gql`
    query site($id: Int!) {
  site(id: $id) {
    id
    name
    createdAt
    updatedAt
    stats {
      totalCategories
      totalItems
    }
  }
}
    `;

/**
 * __useSiteQuery__
 *
 * To run a query within a Vue component, call `useSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSiteQuery({
 *   id: // value for 'id'
 * });
 */
export function useSiteQuery(variables: SiteQueryVariables | VueCompositionApi.Ref<SiteQueryVariables> | ReactiveFunction<SiteQueryVariables>, options: VueApolloComposable.UseQueryOptions<SiteQuery, SiteQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SiteQuery, SiteQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SiteQuery, SiteQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SiteQuery, SiteQueryVariables>(SiteDocument, variables, options);
}
export type SiteQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SiteQuery, SiteQueryVariables>;
export const CreateSiteDocument = gql`
    mutation createSite($createSiteInput: CreateSiteInput!) {
  createSite(createSiteInput: $createSiteInput) {
    id
    name
  }
}
    `;

/**
 * __useCreateSiteMutation__
 *
 * To run a mutation, you first call `useCreateSiteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateSiteMutation({
 *   variables: {
 *     createSiteInput: // value for 'createSiteInput'
 *   },
 * });
 */
export function useCreateSiteMutation(options: VueApolloComposable.UseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument, options);
}
export type CreateSiteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateSiteMutation, CreateSiteMutationVariables>;
export const RemoveSiteDocument = gql`
    mutation removeSite($id: Int!) {
  removeSite(id: $id) {
    id
  }
}
    `;

/**
 * __useRemoveSiteMutation__
 *
 * To run a mutation, you first call `useRemoveSiteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSiteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveSiteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSiteMutation(options: VueApolloComposable.UseMutationOptions<RemoveSiteMutation, RemoveSiteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveSiteMutation, RemoveSiteMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveSiteMutation, RemoveSiteMutationVariables>(RemoveSiteDocument, options);
}
export type RemoveSiteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveSiteMutation, RemoveSiteMutationVariables>;
export const UpdateSiteDocument = gql`
    mutation updateSite($updateSiteInput: UpdateSiteInput!) {
  updateSite(updateSiteInput: $updateSiteInput) {
    id
    name
  }
}
    `;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateSiteMutation({
 *   variables: {
 *     updateSiteInput: // value for 'updateSiteInput'
 *   },
 * });
 */
export function useUpdateSiteMutation(options: VueApolloComposable.UseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, options);
}
export type UpdateSiteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateSiteMutation, UpdateSiteMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: Int!) {
  removeUser(id: $id) {
    id
  }
}
    `;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteUserMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(options: VueApolloComposable.UseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>>) {
  return VueApolloComposable.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
}
export type DeleteUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserMutation({
 *   variables: {
 *     updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserMutation, UpdateUserMutationVariables>;