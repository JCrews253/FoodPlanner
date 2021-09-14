import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Token>;
};


export type MutationLoginArgs = {
  user: UserInput;
};

export type Pantry = {
  __typename?: 'Pantry';
  id: Scalars['ID'];
  items: Array<Maybe<PantryItem>>;
};

export type PantryItem = {
  __typename?: 'PantryItem';
  ingredient: Scalars['String'];
  amount: Scalars['Float'];
  unit?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  recipes: Array<Maybe<Recipe>>;
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  photos: Array<Maybe<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  ingredients: Array<Maybe<RecipeIngredient>>;
  steps?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  ingredient: Scalars['String'];
  amount: Scalars['Float'];
  unit?: Maybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  access: Scalars['String'];
  refresh: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  claims?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<Maybe<{ __typename?: 'Recipe', name?: Maybe<string> }>> };

export type UserLoginMutationVariables = Exact<{
  inputs: UserInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'Token', access: string }> };


export const GetRecipesDocument = `
    query GetRecipes {
  recipes {
    name
  }
}
    `;
export const useGetRecipesQuery = <
      TData = GetRecipesQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: GetRecipesQueryVariables, 
      options?: UseQueryOptions<GetRecipesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<GetRecipesQuery, TError, TData>(
      variables === undefined ? ['GetRecipes'] : ['GetRecipes', variables],
      fetcher<GetRecipesQuery, GetRecipesQueryVariables>(client, GetRecipesDocument, variables, headers),
      options
    );
export const UserLoginDocument = `
    mutation UserLogin($inputs: UserInput!) {
  login(user: $inputs) {
    access
  }
}
    `;
export const useUserLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<UserLoginMutation, TError, UserLoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => 
    useMutation<UserLoginMutation, TError, UserLoginMutationVariables, TContext>(
      (variables?: UserLoginMutationVariables) => fetcher<UserLoginMutation, UserLoginMutationVariables>(client, UserLoginDocument, variables, headers)(),
      options
    );