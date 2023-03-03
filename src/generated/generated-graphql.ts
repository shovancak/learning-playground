import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
};

export type AddUserImageInput = {
  bucketKey: Scalars['String'];
};

export type ImageUploadUrl = {
  __typename?: 'ImageUploadUrl';
  bucketKey: Scalars['String'];
  signedUploadUrl: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserImage: User;
  generateUploadUrl: ImageUploadUrl;
  removeUserImage: User;
  signUp: User;
};


export type MutationAddUserImageArgs = {
  input: AddUserImageInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type RemoveUserImageInput = {
  bucketKey: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  CourseOwner = 'COURSE_OWNER',
  User = 'USER'
}

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firebaseId: Scalars['String'];
  id: Scalars['ID'];
  imageBucketKey?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Role;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type GenerateUploadUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateUploadUrlMutation = { __typename?: 'Mutation', generateUploadUrl: { __typename?: 'ImageUploadUrl', signedUploadUrl: string, bucketKey: string } };

export type UserInfoFragment = { __typename?: 'User', id: string, firebaseId: string, name: string, email: string, imageBucketKey?: string | null, role: Role, createdAt: string, updatedAt?: string | null, imageUrl?: string | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firebaseId: string, name: string, email: string, imageBucketKey?: string | null, role: Role, createdAt: string, updatedAt?: string | null, imageUrl?: string | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, firebaseId: string, name: string, email: string, imageBucketKey?: string | null, role: Role, createdAt: string, updatedAt?: string | null, imageUrl?: string | null } };

export type AddUserImageMutationVariables = Exact<{
  input: AddUserImageInput;
}>;


export type AddUserImageMutation = { __typename?: 'Mutation', addUserImage: { __typename?: 'User', id: string, firebaseId: string, name: string, email: string, imageBucketKey?: string | null, role: Role, createdAt: string, updatedAt?: string | null, imageUrl?: string | null } };

export type RemoveUserImageMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveUserImageMutation = { __typename?: 'Mutation', removeUserImage: { __typename?: 'User', id: string, firebaseId: string, name: string, email: string, imageBucketKey?: string | null, role: Role, createdAt: string, updatedAt?: string | null, imageUrl?: string | null } };

export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  firebaseId
  name
  email
  imageBucketKey
  role
  createdAt
  updatedAt
  imageUrl
}
    `;
export const GenerateUploadUrlDocument = gql`
    mutation GenerateUploadUrl {
  generateUploadUrl {
    signedUploadUrl
    bucketKey
  }
}
    `;
export type GenerateUploadUrlMutationFn = Apollo.MutationFunction<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>;

/**
 * __useGenerateUploadUrlMutation__
 *
 * To run a mutation, you first call `useGenerateUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateUploadUrlMutation, { data, loading, error }] = useGenerateUploadUrlMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>(GenerateUploadUrlDocument, options);
      }
export type GenerateUploadUrlMutationHookResult = ReturnType<typeof useGenerateUploadUrlMutation>;
export type GenerateUploadUrlMutationResult = Apollo.MutationResult<GenerateUploadUrlMutation>;
export type GenerateUploadUrlMutationOptions = Apollo.BaseMutationOptions<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

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
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const AddUserImageDocument = gql`
    mutation AddUserImage($input: AddUserImageInput!) {
  addUserImage(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export type AddUserImageMutationFn = Apollo.MutationFunction<AddUserImageMutation, AddUserImageMutationVariables>;

/**
 * __useAddUserImageMutation__
 *
 * To run a mutation, you first call `useAddUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserImageMutation, { data, loading, error }] = useAddUserImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserImageMutation(baseOptions?: Apollo.MutationHookOptions<AddUserImageMutation, AddUserImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserImageMutation, AddUserImageMutationVariables>(AddUserImageDocument, options);
      }
export type AddUserImageMutationHookResult = ReturnType<typeof useAddUserImageMutation>;
export type AddUserImageMutationResult = Apollo.MutationResult<AddUserImageMutation>;
export type AddUserImageMutationOptions = Apollo.BaseMutationOptions<AddUserImageMutation, AddUserImageMutationVariables>;
export const RemoveUserImageDocument = gql`
    mutation RemoveUserImage {
  removeUserImage {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export type RemoveUserImageMutationFn = Apollo.MutationFunction<RemoveUserImageMutation, RemoveUserImageMutationVariables>;

/**
 * __useRemoveUserImageMutation__
 *
 * To run a mutation, you first call `useRemoveUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserImageMutation, { data, loading, error }] = useRemoveUserImageMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveUserImageMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserImageMutation, RemoveUserImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserImageMutation, RemoveUserImageMutationVariables>(RemoveUserImageDocument, options);
      }
export type RemoveUserImageMutationHookResult = ReturnType<typeof useRemoveUserImageMutation>;
export type RemoveUserImageMutationResult = Apollo.MutationResult<RemoveUserImageMutation>;
export type RemoveUserImageMutationOptions = Apollo.BaseMutationOptions<RemoveUserImageMutation, RemoveUserImageMutationVariables>;