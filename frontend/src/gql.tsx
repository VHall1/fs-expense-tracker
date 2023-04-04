import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  _count?: Maybe<AccountCount>;
  active: Scalars['Boolean'];
  balance: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  currency: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type AccountCount = {
  __typename?: 'AccountCount';
  transactions: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction: Transaction;
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
};


export type MutationCreateTransactionArgs = {
  transaction: TransactionInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  me?: Maybe<User>;
  user?: Maybe<User>;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId: Scalars['String'];
  amount: Scalars['Float'];
  categoryId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  type: TransactionType;
  updatedAt: Scalars['DateTime'];
};

export type TransactionCategory = {
  __typename?: 'TransactionCategory';
  _count?: Maybe<TransactionCategoryCount>;
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  type: TransactionCategoryType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TransactionCategoryCount = {
  __typename?: 'TransactionCategoryCount';
  transaction: Scalars['Int'];
};

export enum TransactionCategoryType {
  Asset = 'ASSET',
  Equity = 'EQUITY',
  Expense = 'EXPENSE',
  Liability = 'LIABILITY',
  Revenue = 'REVENUE'
}

export type TransactionInput = {
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  categoryId: Scalars['Int'];
  type: TransactionType;
};

export enum TransactionType {
  MoneyIn = 'MONEY_IN',
  MoneyOut = 'MONEY_OUT'
}

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  accounts: Array<Account>;
  categories: Array<TransactionCategory>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  accounts: Scalars['Int'];
  transactionCategories: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username?: string | null, email: string } | null };

export type MyAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountsQuery = { __typename?: 'Query', me?: { __typename?: 'User', accounts: Array<{ __typename?: 'Account', id: string, name: string, balance: number, active: boolean, currency: string }> } | null };


export const LoginDocument = gql`
    mutation Login($email: String!) {
  login(email: $email)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

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
 *      email: // value for 'email'
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
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyAccountsDocument = gql`
    query MyAccounts {
  me {
    accounts {
      id
      name
      balance
      active
      currency
    }
  }
}
    `;
export type MyAccountsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyAccountsQuery, MyAccountsQueryVariables>, 'query'>;

    export const MyAccountsComponent = (props: MyAccountsComponentProps) => (
      <ApolloReactComponents.Query<MyAccountsQuery, MyAccountsQueryVariables> query={MyAccountsDocument} {...props} />
    );
    

/**
 * __useMyAccountsQuery__
 *
 * To run a query within a React component, call `useMyAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAccountsQuery(baseOptions?: Apollo.QueryHookOptions<MyAccountsQuery, MyAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAccountsQuery, MyAccountsQueryVariables>(MyAccountsDocument, options);
      }
export function useMyAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAccountsQuery, MyAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAccountsQuery, MyAccountsQueryVariables>(MyAccountsDocument, options);
        }
export type MyAccountsQueryHookResult = ReturnType<typeof useMyAccountsQuery>;
export type MyAccountsLazyQueryHookResult = ReturnType<typeof useMyAccountsLazyQuery>;
export type MyAccountsQueryResult = Apollo.QueryResult<MyAccountsQuery, MyAccountsQueryVariables>;