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
  parentId?: Maybe<Scalars['Int']>;
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

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
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
  createUser: User;
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


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
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
  updatedAt: Scalars['DateTime'];
};

export type SiteInput = {
  categories: Array<CategoryInput>;
  items: Array<ItemInput>;
  name: Scalars['String'];
  owner: UserInput;
  ownerId: Scalars['Float'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
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
  password: Scalars['String'];
  role: Roles;
  sites?: Maybe<Array<Maybe<Site>>>;
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role: Roles;
  sites?: Maybe<Array<Maybe<SiteInput>>>;
};

export type ItemQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, category: { __typename?: 'Category', id: number, name: string }, images?: Array<{ __typename?: 'Image', id: number, path: string, main: boolean } | null | undefined> | null | undefined } };

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


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, category: { __typename?: 'Category', id: number, name: string }, images?: Array<{ __typename?: 'Image', id: number, path: string, main: boolean } | null | undefined> | null | undefined } };

export type GetItemsQueryVariables = Exact<{
  siteId: Scalars['Int'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, createdAt: any, updatedAt: any, numberForExchange: number, numberInCollection: number, category: { __typename?: 'Category', name: string }, images?: Array<{ __typename?: 'Image', path: string, main: boolean } | null | undefined> | null | undefined }> };


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
    category {
      id
      name
    }
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
    category {
      id
      name
    }
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