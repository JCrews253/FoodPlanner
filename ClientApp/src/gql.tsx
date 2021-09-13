import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  inputs: UserLogin;
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

export type UserLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<Maybe<{ __typename?: 'Recipe', name?: Maybe<string> }>> };

export type LoginMutationVariables = Exact<{
  inputs: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'Token', access: string }> };


export const GetRecipesDocument = gql`
    query GetRecipes {
  recipes {
    name
  }
}
    `;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;
export const LoginDocument = gql`
    mutation login($inputs: UserLogin!) {
  login(inputs: $inputs) {
    access
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;