import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Country = {
   __typename?: 'Country';
  name?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Result>>>;
  mostRecent?: Maybe<Result>;
};

export type DateInput = {
  eq?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  results?: Maybe<Array<Maybe<Result>>>;
  result?: Maybe<Result>;
  countries?: Maybe<Array<Maybe<Country>>>;
  country?: Maybe<Country>;
};


export type QueryResultsArgs = {
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  date?: Maybe<DateInput>;
};


export type QueryResultArgs = {
  country: Scalars['String'];
  date?: Maybe<Scalars['String']>;
};


export type QueryCountriesArgs = {
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryCountryArgs = {
  name?: Maybe<Scalars['String']>;
};

export type Result = {
   __typename?: 'Result';
  country?: Maybe<Country>;
  date?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  recovered?: Maybe<Scalars['Int']>;
  growthRate?: Maybe<Scalars['Float']>;
};


export type ResultDateArgs = {
  format?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  DateInput: DateInput,
  Result: ResolverTypeWrapper<Result>,
  Country: ResolverTypeWrapper<Country>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  DateInput: DateInput,
  Result: Result,
  Country: Country,
  Int: Scalars['Int'],
  Float: Scalars['Float'],
  Boolean: Scalars['Boolean'],
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Result']>>>, ParentType, ContextType>,
  mostRecent?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Result']>>>, ParentType, ContextType, RequireFields<QueryResultsArgs, never>>,
  result?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<QueryResultArgs, 'country'>>,
  countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType, RequireFields<QueryCountriesArgs, never>>,
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountryArgs, never>>,
};

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ResultDateArgs, never>>,
  confirmed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  deaths?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  recovered?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  growthRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Country?: CountryResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Result?: ResultResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
