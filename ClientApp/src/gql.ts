import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  newRecipe: Scalars['Boolean'];
  saveRecipe?: Maybe<Scalars['Boolean']>;
};


export type MutationNewRecipeArgs = {
  recipe?: InputMaybe<RecipeInput>;
};


export type MutationSaveRecipeArgs = {
  recipeId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  myRecipes: Array<Recipe>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
};


export type QueryRecipeArgs = {
  recipeId: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  creator: Scalars['ID'];
  description: Scalars['String'];
  ingredients: Array<Scalars['String']>;
  name: Scalars['String'];
  parentId?: Maybe<Scalars['ID']>;
  photos: Array<Scalars['String']>;
  recipeId: Scalars['ID'];
  steps: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  times: Array<RecipeTime>;
};

export type RecipeInput = {
  description: Scalars['String'];
  ingredients: Array<Scalars['String']>;
  name: Scalars['String'];
  photo: Array<Scalars['String']>;
  steps: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
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

export type User = {
  __typename?: 'User';
  savedRecipeIds: Array<Maybe<Scalars['String']>>;
  userId: Scalars['ID'];
};

export type SaveRecipeMutationVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type SaveRecipeMutation = { __typename?: 'Mutation', saveRecipe?: boolean | null | undefined };

export type NewRecipeMutationVariables = Exact<{
  inputs: RecipeInput;
}>;


export type NewRecipeMutation = { __typename?: 'Mutation', newRecipe: boolean };

export type AllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', recipeId: string, name: string, photos: Array<string>, description: string }> };

export type SavedRecipeIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type SavedRecipeIdsQuery = { __typename?: 'Query', myRecipes: Array<{ __typename?: 'Recipe', recipeId: string }> };

export type MyRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRecipesQuery = { __typename?: 'Query', myRecipes: Array<{ __typename?: 'Recipe', recipeId: string, name: string, photos: Array<string>, description: string }> };

export type GetRecipeQueryVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', name: string, photos: Array<string>, description: string, ingredients: Array<string>, steps: Array<string>, tags: Array<string>, times: Array<{ __typename?: 'RecipeTime', name: string, time: string }> } | null | undefined };


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
      'SaveRecipe',
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
      'NewRecipe',
      (variables?: NewRecipeMutationVariables) => fetcher<NewRecipeMutation, NewRecipeMutationVariables>(client, NewRecipeDocument, variables, headers)(),
      options
    );
export const AllRecipesDocument = `
    query AllRecipes {
  recipes {
    recipeId
    name
    photos
    description
  }
}
    `;
export const useAllRecipesQuery = <
      TData = AllRecipesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AllRecipesQueryVariables,
      options?: UseQueryOptions<AllRecipesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllRecipesQuery, TError, TData>(
      variables === undefined ? ['AllRecipes'] : ['AllRecipes', variables],
      fetcher<AllRecipesQuery, AllRecipesQueryVariables>(client, AllRecipesDocument, variables, headers),
      options
    );
export const SavedRecipeIdsDocument = `
    query savedRecipeIds {
  myRecipes {
    recipeId
  }
}
    `;
export const useSavedRecipeIdsQuery = <
      TData = SavedRecipeIdsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SavedRecipeIdsQueryVariables,
      options?: UseQueryOptions<SavedRecipeIdsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SavedRecipeIdsQuery, TError, TData>(
      variables === undefined ? ['savedRecipeIds'] : ['savedRecipeIds', variables],
      fetcher<SavedRecipeIdsQuery, SavedRecipeIdsQueryVariables>(client, SavedRecipeIdsDocument, variables, headers),
      options
    );
export const MyRecipesDocument = `
    query MyRecipes {
  myRecipes {
    recipeId
    name
    photos
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
    photos
    description
    times {
      name
      time
    }
    ingredients
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