import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
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
  newRecipe: Scalars['Boolean'];
  register?: Maybe<Scalars['String']>;
  saveRecipe?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  user: UserInput;
};


export type MutationNewRecipeArgs = {
  recipe?: Maybe<RecipeInput>;
};


export type MutationRegisterArgs = {
  user: UserInput;
};


export type MutationSaveRecipeArgs = {
  recipeId: Scalars['String'];
};

export type Pantry = {
  __typename?: 'Pantry';
  id: Scalars['ID'];
  items: Array<Maybe<PantryItem>>;
};

export type PantryItem = {
  __typename?: 'PantryItem';
  amount: Scalars['Float'];
  expirationDate?: Maybe<Scalars['Date']>;
  ingredient: Scalars['String'];
  unit?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  myRecipes: Array<Maybe<Recipe>>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Maybe<Recipe>>;
};


export type QueryRecipeArgs = {
  recipeId: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ingredients: Array<RecipeIngredient>;
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  steps: Array<Maybe<Scalars['String']>>;
  tags: Array<Maybe<Scalars['String']>>;
  times: Array<RecipeTime>;
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  amount: Scalars['Float'];
  ingredient: Scalars['String'];
  unit?: Maybe<Scalars['String']>;
};

export type RecipeIngredientInput = {
  Amount: Scalars['Float'];
  Ingredient: Scalars['String'];
  Unit?: Maybe<Scalars['String']>;
};

export type RecipeInput = {
  description?: Maybe<Scalars['String']>;
  ingredients: Array<RecipeIngredientInput>;
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  steps: Array<Maybe<Scalars['String']>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  times: Array<RecipeTimeInput>;
};

export type RecipeTime = {
  __typename?: 'RecipeTime';
  name: Scalars['String'];
  time: Scalars['String'];
};

export type RecipeTimeInput = {
  name: Scalars['String'];
  time: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  access: Scalars['String'];
  refresh: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  claims?: Maybe<Array<Maybe<Scalars['String']>>>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  savedRecipeIds: Array<Maybe<Scalars['String']>>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type SaveRecipeMutationVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type SaveRecipeMutation = { __typename?: 'Mutation', saveRecipe?: Maybe<boolean> };

export type NewRecipeMutationVariables = Exact<{
  inputs: RecipeInput;
}>;


export type NewRecipeMutation = { __typename?: 'Mutation', newRecipe: boolean };

export type UserLoginMutationVariables = Exact<{
  inputs: UserInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'Token', access: string, refresh: string }> };

export type MyRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRecipesQuery = { __typename?: 'Query', myRecipes: Array<Maybe<{ __typename?: 'Recipe', id: string, name: string, photo?: Maybe<string>, description?: Maybe<string> }>> };

export type GetRecipeQueryVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe?: Maybe<{ __typename?: 'Recipe', name: string, photo?: Maybe<string>, description?: Maybe<string>, steps: Array<Maybe<string>>, tags: Array<Maybe<string>>, times: Array<{ __typename?: 'RecipeTime', name: string, time: string }>, ingredients: Array<{ __typename?: 'RecipeIngredient', amount: number, ingredient: string, unit?: Maybe<string> }> }> };

export type RegisterMutationVariables = Exact<{
  inputs: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<string> };


export const SaveRecipeDocument = `
    mutation SaveRecipe($recipeId: String!) {
  saveRecipe(recipeId: $recipeId)
}
    `;
export const useSaveRecipeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<SaveRecipeMutation, TError, SaveRecipeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => 
    useMutation<SaveRecipeMutation, TError, SaveRecipeMutationVariables, TContext>(
      (variables?: SaveRecipeMutationVariables) => fetcher<SaveRecipeMutation, SaveRecipeMutationVariables>(client, SaveRecipeDocument, variables, headers)(),
      options
    );
export const NewRecipeDocument = `
    mutation NewRecipe($inputs: RecipeInput!) {
  newRecipe(recipe: $inputs)
}
    `;
export const useNewRecipeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<NewRecipeMutation, TError, NewRecipeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => 
    useMutation<NewRecipeMutation, TError, NewRecipeMutationVariables, TContext>(
      (variables?: NewRecipeMutationVariables) => fetcher<NewRecipeMutation, NewRecipeMutationVariables>(client, NewRecipeDocument, variables, headers)(),
      options
    );
export const UserLoginDocument = `
    mutation UserLogin($inputs: UserInput!) {
  login(user: $inputs) {
    access
    refresh
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
export const MyRecipesDocument = `
    query MyRecipes {
  myRecipes {
    id
    name
    photo
    description
  }
}
    `;
export const useMyRecipesQuery = <
      TData = MyRecipesQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: MyRecipesQueryVariables, 
      options?: UseQueryOptions<MyRecipesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<MyRecipesQuery, TError, TData>(
      variables === undefined ? ['MyRecipes'] : ['MyRecipes', variables],
      fetcher<MyRecipesQuery, MyRecipesQueryVariables>(client, MyRecipesDocument, variables, headers),
      options
    );
export const GetRecipeDocument = `
    query GetRecipe($recipeId: String!) {
  recipe(recipeId: $recipeId) {
    name
    photo
    description
    times {
      name
      time
    }
    ingredients {
      amount
      ingredient
      unit
    }
    steps
    tags
  }
}
    `;
export const useGetRecipeQuery = <
      TData = GetRecipeQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetRecipeQueryVariables, 
      options?: UseQueryOptions<GetRecipeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => 
    useQuery<GetRecipeQuery, TError, TData>(
      ['GetRecipe', variables],
      fetcher<GetRecipeQuery, GetRecipeQueryVariables>(client, GetRecipeDocument, variables, headers),
      options
    );
export const RegisterDocument = `
    mutation Register($inputs: UserInput!) {
  register(user: $inputs)
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => 
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );