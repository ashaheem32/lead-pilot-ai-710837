
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserIdentity
 * 
 */
export type UserIdentity = $Result.DefaultSelection<Prisma.$UserIdentityPayload>
/**
 * Model Otp
 * 
 */
export type Otp = $Result.DefaultSelection<Prisma.$OtpPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model ICP
 * 
 */
export type ICP = $Result.DefaultSelection<Prisma.$ICPPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userIdentity`: Exposes CRUD operations for the **UserIdentity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserIdentities
    * const userIdentities = await prisma.userIdentity.findMany()
    * ```
    */
  get userIdentity(): Prisma.UserIdentityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otp`: Exposes CRUD operations for the **Otp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Otps
    * const otps = await prisma.otp.findMany()
    * ```
    */
  get otp(): Prisma.OtpDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.iCP`: Exposes CRUD operations for the **ICP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ICPS
    * const iCPS = await prisma.iCP.findMany()
    * ```
    */
  get iCP(): Prisma.ICPDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserIdentity: 'UserIdentity',
    Otp: 'Otp',
    Lead: 'Lead',
    ICP: 'ICP'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userIdentity" | "otp" | "lead" | "iCP"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserIdentity: {
        payload: Prisma.$UserIdentityPayload<ExtArgs>
        fields: Prisma.UserIdentityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserIdentityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserIdentityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          findFirst: {
            args: Prisma.UserIdentityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserIdentityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          findMany: {
            args: Prisma.UserIdentityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          create: {
            args: Prisma.UserIdentityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          createMany: {
            args: Prisma.UserIdentityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserIdentityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          delete: {
            args: Prisma.UserIdentityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          update: {
            args: Prisma.UserIdentityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          deleteMany: {
            args: Prisma.UserIdentityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserIdentityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserIdentityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          upsert: {
            args: Prisma.UserIdentityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          aggregate: {
            args: Prisma.UserIdentityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserIdentity>
          }
          groupBy: {
            args: Prisma.UserIdentityGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserIdentityGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserIdentityCountArgs<ExtArgs>
            result: $Utils.Optional<UserIdentityCountAggregateOutputType> | number
          }
        }
      }
      Otp: {
        payload: Prisma.$OtpPayload<ExtArgs>
        fields: Prisma.OtpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          findFirst: {
            args: Prisma.OtpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          findMany: {
            args: Prisma.OtpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          create: {
            args: Prisma.OtpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          createMany: {
            args: Prisma.OtpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          delete: {
            args: Prisma.OtpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          update: {
            args: Prisma.OtpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          deleteMany: {
            args: Prisma.OtpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          upsert: {
            args: Prisma.OtpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          aggregate: {
            args: Prisma.OtpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtp>
          }
          groupBy: {
            args: Prisma.OtpGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      ICP: {
        payload: Prisma.$ICPPayload<ExtArgs>
        fields: Prisma.ICPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ICPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ICPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>
          }
          findFirst: {
            args: Prisma.ICPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ICPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>
          }
          findMany: {
            args: Prisma.ICPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>[]
          }
          create: {
            args: Prisma.ICPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>
          }
          createMany: {
            args: Prisma.ICPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ICPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>[]
          }
          delete: {
            args: Prisma.ICPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>
          }
          update: {
            args: Prisma.ICPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>
          }
          deleteMany: {
            args: Prisma.ICPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ICPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ICPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>[]
          }
          upsert: {
            args: Prisma.ICPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ICPPayload>
          }
          aggregate: {
            args: Prisma.ICPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateICP>
          }
          groupBy: {
            args: Prisma.ICPGroupByArgs<ExtArgs>
            result: $Utils.Optional<ICPGroupByOutputType>[]
          }
          count: {
            args: Prisma.ICPCountArgs<ExtArgs>
            result: $Utils.Optional<ICPCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userIdentity?: UserIdentityOmit
    otp?: OtpOmit
    lead?: LeadOmit
    iCP?: ICPOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    identities: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | UserCountOutputTypeCountIdentitiesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountIdentitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserIdentityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    isDeleted: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    isDeleted: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    isDeleted: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    isDeleted?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    isDeleted?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    isDeleted?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    createdAt: Date
    isDeleted: boolean | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
    identities?: boolean | User$identitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    isDeleted?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "isDeleted", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | User$identitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      identities: Prisma.$UserIdentityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      createdAt: Date
      isDeleted: boolean | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    identities<T extends User$identitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$identitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly isDeleted: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.identities
   */
  export type User$identitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    where?: UserIdentityWhereInput
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    cursor?: UserIdentityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserIdentity
   */

  export type AggregateUserIdentity = {
    _count: UserIdentityCountAggregateOutputType | null
    _min: UserIdentityMinAggregateOutputType | null
    _max: UserIdentityMaxAggregateOutputType | null
  }

  export type UserIdentityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type UserIdentityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type UserIdentityCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerId: number
    metadata: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type UserIdentityMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type UserIdentityMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type UserIdentityCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type UserIdentityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserIdentity to aggregate.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserIdentities
    **/
    _count?: true | UserIdentityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserIdentityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserIdentityMaxAggregateInputType
  }

  export type GetUserIdentityAggregateType<T extends UserIdentityAggregateArgs> = {
        [P in keyof T & keyof AggregateUserIdentity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserIdentity[P]>
      : GetScalarType<T[P], AggregateUserIdentity[P]>
  }




  export type UserIdentityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserIdentityWhereInput
    orderBy?: UserIdentityOrderByWithAggregationInput | UserIdentityOrderByWithAggregationInput[]
    by: UserIdentityScalarFieldEnum[] | UserIdentityScalarFieldEnum
    having?: UserIdentityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserIdentityCountAggregateInputType | true
    _min?: UserIdentityMinAggregateInputType
    _max?: UserIdentityMaxAggregateInputType
  }

  export type UserIdentityGroupByOutputType = {
    id: string
    userId: string
    provider: string
    providerId: string
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean | null
    _count: UserIdentityCountAggregateOutputType | null
    _min: UserIdentityMinAggregateOutputType | null
    _max: UserIdentityMaxAggregateOutputType | null
  }

  type GetUserIdentityGroupByPayload<T extends UserIdentityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserIdentityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserIdentityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserIdentityGroupByOutputType[P]>
            : GetScalarType<T[P], UserIdentityGroupByOutputType[P]>
        }
      >
    >


  export type UserIdentitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type UserIdentityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerId" | "metadata" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["userIdentity"]>
  export type UserIdentityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserIdentityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserIdentityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserIdentityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserIdentity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      providerId: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean | null
    }, ExtArgs["result"]["userIdentity"]>
    composites: {}
  }

  type UserIdentityGetPayload<S extends boolean | null | undefined | UserIdentityDefaultArgs> = $Result.GetResult<Prisma.$UserIdentityPayload, S>

  type UserIdentityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserIdentityCountAggregateInputType | true
    }

  export interface UserIdentityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserIdentity'], meta: { name: 'UserIdentity' } }
    /**
     * Find zero or one UserIdentity that matches the filter.
     * @param {UserIdentityFindUniqueArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserIdentityFindUniqueArgs>(args: SelectSubset<T, UserIdentityFindUniqueArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserIdentity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserIdentityFindUniqueOrThrowArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserIdentityFindUniqueOrThrowArgs>(args: SelectSubset<T, UserIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserIdentity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindFirstArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserIdentityFindFirstArgs>(args?: SelectSubset<T, UserIdentityFindFirstArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserIdentity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindFirstOrThrowArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserIdentityFindFirstOrThrowArgs>(args?: SelectSubset<T, UserIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserIdentities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserIdentities
     * const userIdentities = await prisma.userIdentity.findMany()
     * 
     * // Get first 10 UserIdentities
     * const userIdentities = await prisma.userIdentity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserIdentityFindManyArgs>(args?: SelectSubset<T, UserIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserIdentity.
     * @param {UserIdentityCreateArgs} args - Arguments to create a UserIdentity.
     * @example
     * // Create one UserIdentity
     * const UserIdentity = await prisma.userIdentity.create({
     *   data: {
     *     // ... data to create a UserIdentity
     *   }
     * })
     * 
     */
    create<T extends UserIdentityCreateArgs>(args: SelectSubset<T, UserIdentityCreateArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserIdentities.
     * @param {UserIdentityCreateManyArgs} args - Arguments to create many UserIdentities.
     * @example
     * // Create many UserIdentities
     * const userIdentity = await prisma.userIdentity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserIdentityCreateManyArgs>(args?: SelectSubset<T, UserIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserIdentities and returns the data saved in the database.
     * @param {UserIdentityCreateManyAndReturnArgs} args - Arguments to create many UserIdentities.
     * @example
     * // Create many UserIdentities
     * const userIdentity = await prisma.userIdentity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserIdentities and only return the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserIdentityCreateManyAndReturnArgs>(args?: SelectSubset<T, UserIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserIdentity.
     * @param {UserIdentityDeleteArgs} args - Arguments to delete one UserIdentity.
     * @example
     * // Delete one UserIdentity
     * const UserIdentity = await prisma.userIdentity.delete({
     *   where: {
     *     // ... filter to delete one UserIdentity
     *   }
     * })
     * 
     */
    delete<T extends UserIdentityDeleteArgs>(args: SelectSubset<T, UserIdentityDeleteArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserIdentity.
     * @param {UserIdentityUpdateArgs} args - Arguments to update one UserIdentity.
     * @example
     * // Update one UserIdentity
     * const userIdentity = await prisma.userIdentity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserIdentityUpdateArgs>(args: SelectSubset<T, UserIdentityUpdateArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserIdentities.
     * @param {UserIdentityDeleteManyArgs} args - Arguments to filter UserIdentities to delete.
     * @example
     * // Delete a few UserIdentities
     * const { count } = await prisma.userIdentity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserIdentityDeleteManyArgs>(args?: SelectSubset<T, UserIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserIdentities
     * const userIdentity = await prisma.userIdentity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserIdentityUpdateManyArgs>(args: SelectSubset<T, UserIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserIdentities and returns the data updated in the database.
     * @param {UserIdentityUpdateManyAndReturnArgs} args - Arguments to update many UserIdentities.
     * @example
     * // Update many UserIdentities
     * const userIdentity = await prisma.userIdentity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserIdentities and only return the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserIdentityUpdateManyAndReturnArgs>(args: SelectSubset<T, UserIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserIdentity.
     * @param {UserIdentityUpsertArgs} args - Arguments to update or create a UserIdentity.
     * @example
     * // Update or create a UserIdentity
     * const userIdentity = await prisma.userIdentity.upsert({
     *   create: {
     *     // ... data to create a UserIdentity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserIdentity we want to update
     *   }
     * })
     */
    upsert<T extends UserIdentityUpsertArgs>(args: SelectSubset<T, UserIdentityUpsertArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityCountArgs} args - Arguments to filter UserIdentities to count.
     * @example
     * // Count the number of UserIdentities
     * const count = await prisma.userIdentity.count({
     *   where: {
     *     // ... the filter for the UserIdentities we want to count
     *   }
     * })
    **/
    count<T extends UserIdentityCountArgs>(
      args?: Subset<T, UserIdentityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserIdentityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserIdentityAggregateArgs>(args: Subset<T, UserIdentityAggregateArgs>): Prisma.PrismaPromise<GetUserIdentityAggregateType<T>>

    /**
     * Group by UserIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserIdentityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserIdentityGroupByArgs['orderBy'] }
        : { orderBy?: UserIdentityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserIdentity model
   */
  readonly fields: UserIdentityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserIdentity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserIdentityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserIdentity model
   */
  interface UserIdentityFieldRefs {
    readonly id: FieldRef<"UserIdentity", 'String'>
    readonly userId: FieldRef<"UserIdentity", 'String'>
    readonly provider: FieldRef<"UserIdentity", 'String'>
    readonly providerId: FieldRef<"UserIdentity", 'String'>
    readonly metadata: FieldRef<"UserIdentity", 'Json'>
    readonly createdAt: FieldRef<"UserIdentity", 'DateTime'>
    readonly updatedAt: FieldRef<"UserIdentity", 'DateTime'>
    readonly isDeleted: FieldRef<"UserIdentity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserIdentity findUnique
   */
  export type UserIdentityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity findUniqueOrThrow
   */
  export type UserIdentityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity findFirst
   */
  export type UserIdentityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserIdentities.
     */
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity findFirstOrThrow
   */
  export type UserIdentityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserIdentities.
     */
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity findMany
   */
  export type UserIdentityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentities to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity create
   */
  export type UserIdentityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The data needed to create a UserIdentity.
     */
    data: XOR<UserIdentityCreateInput, UserIdentityUncheckedCreateInput>
  }

  /**
   * UserIdentity createMany
   */
  export type UserIdentityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserIdentities.
     */
    data: UserIdentityCreateManyInput | UserIdentityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserIdentity createManyAndReturn
   */
  export type UserIdentityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * The data used to create many UserIdentities.
     */
    data: UserIdentityCreateManyInput | UserIdentityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserIdentity update
   */
  export type UserIdentityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The data needed to update a UserIdentity.
     */
    data: XOR<UserIdentityUpdateInput, UserIdentityUncheckedUpdateInput>
    /**
     * Choose, which UserIdentity to update.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity updateMany
   */
  export type UserIdentityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserIdentities.
     */
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyInput>
    /**
     * Filter which UserIdentities to update
     */
    where?: UserIdentityWhereInput
    /**
     * Limit how many UserIdentities to update.
     */
    limit?: number
  }

  /**
   * UserIdentity updateManyAndReturn
   */
  export type UserIdentityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * The data used to update UserIdentities.
     */
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyInput>
    /**
     * Filter which UserIdentities to update
     */
    where?: UserIdentityWhereInput
    /**
     * Limit how many UserIdentities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserIdentity upsert
   */
  export type UserIdentityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The filter to search for the UserIdentity to update in case it exists.
     */
    where: UserIdentityWhereUniqueInput
    /**
     * In case the UserIdentity found by the `where` argument doesn't exist, create a new UserIdentity with this data.
     */
    create: XOR<UserIdentityCreateInput, UserIdentityUncheckedCreateInput>
    /**
     * In case the UserIdentity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserIdentityUpdateInput, UserIdentityUncheckedUpdateInput>
  }

  /**
   * UserIdentity delete
   */
  export type UserIdentityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter which UserIdentity to delete.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity deleteMany
   */
  export type UserIdentityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserIdentities to delete
     */
    where?: UserIdentityWhereInput
    /**
     * Limit how many UserIdentities to delete.
     */
    limit?: number
  }

  /**
   * UserIdentity without action
   */
  export type UserIdentityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserIdentity
     */
    omit?: UserIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
  }


  /**
   * Model Otp
   */

  export type AggregateOtp = {
    _count: OtpCountAggregateOutputType | null
    _avg: OtpAvgAggregateOutputType | null
    _sum: OtpSumAggregateOutputType | null
    _min: OtpMinAggregateOutputType | null
    _max: OtpMaxAggregateOutputType | null
  }

  export type OtpAvgAggregateOutputType = {
    attempts: number | null
  }

  export type OtpSumAggregateOutputType = {
    attempts: number | null
  }

  export type OtpMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    type: string | null
    otp: string | null
    expiresAt: Date | null
    attempts: number | null
    verified: boolean | null
    purpose: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type OtpMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    type: string | null
    otp: string | null
    expiresAt: Date | null
    attempts: number | null
    verified: boolean | null
    purpose: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type OtpCountAggregateOutputType = {
    id: number
    identifier: number
    type: number
    otp: number
    expiresAt: number
    attempts: number
    verified: number
    purpose: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type OtpAvgAggregateInputType = {
    attempts?: true
  }

  export type OtpSumAggregateInputType = {
    attempts?: true
  }

  export type OtpMinAggregateInputType = {
    id?: true
    identifier?: true
    type?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    verified?: true
    purpose?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type OtpMaxAggregateInputType = {
    id?: true
    identifier?: true
    type?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    verified?: true
    purpose?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type OtpCountAggregateInputType = {
    id?: true
    identifier?: true
    type?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    verified?: true
    purpose?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type OtpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Otp to aggregate.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Otps
    **/
    _count?: true | OtpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpMaxAggregateInputType
  }

  export type GetOtpAggregateType<T extends OtpAggregateArgs> = {
        [P in keyof T & keyof AggregateOtp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtp[P]>
      : GetScalarType<T[P], AggregateOtp[P]>
  }




  export type OtpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpWhereInput
    orderBy?: OtpOrderByWithAggregationInput | OtpOrderByWithAggregationInput[]
    by: OtpScalarFieldEnum[] | OtpScalarFieldEnum
    having?: OtpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCountAggregateInputType | true
    _avg?: OtpAvgAggregateInputType
    _sum?: OtpSumAggregateInputType
    _min?: OtpMinAggregateInputType
    _max?: OtpMaxAggregateInputType
  }

  export type OtpGroupByOutputType = {
    id: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date
    attempts: number
    verified: boolean
    purpose: string | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean | null
    _count: OtpCountAggregateOutputType | null
    _avg: OtpAvgAggregateOutputType | null
    _sum: OtpSumAggregateOutputType | null
    _min: OtpMinAggregateOutputType | null
    _max: OtpMaxAggregateOutputType | null
  }

  type GetOtpGroupByPayload<T extends OtpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpGroupByOutputType[P]>
            : GetScalarType<T[P], OtpGroupByOutputType[P]>
        }
      >
    >


  export type OtpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectScalar = {
    id?: boolean
    identifier?: boolean
    type?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    verified?: boolean
    purpose?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type OtpOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "type" | "otp" | "expiresAt" | "attempts" | "verified" | "purpose" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["otp"]>

  export type $OtpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Otp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      type: string
      otp: string
      expiresAt: Date
      attempts: number
      verified: boolean
      purpose: string | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean | null
    }, ExtArgs["result"]["otp"]>
    composites: {}
  }

  type OtpGetPayload<S extends boolean | null | undefined | OtpDefaultArgs> = $Result.GetResult<Prisma.$OtpPayload, S>

  type OtpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCountAggregateInputType | true
    }

  export interface OtpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Otp'], meta: { name: 'Otp' } }
    /**
     * Find zero or one Otp that matches the filter.
     * @param {OtpFindUniqueArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpFindUniqueArgs>(args: SelectSubset<T, OtpFindUniqueArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Otp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpFindUniqueOrThrowArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindFirstArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpFindFirstArgs>(args?: SelectSubset<T, OtpFindFirstArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindFirstOrThrowArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Otps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Otps
     * const otps = await prisma.otp.findMany()
     * 
     * // Get first 10 Otps
     * const otps = await prisma.otp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpWithIdOnly = await prisma.otp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpFindManyArgs>(args?: SelectSubset<T, OtpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Otp.
     * @param {OtpCreateArgs} args - Arguments to create a Otp.
     * @example
     * // Create one Otp
     * const Otp = await prisma.otp.create({
     *   data: {
     *     // ... data to create a Otp
     *   }
     * })
     * 
     */
    create<T extends OtpCreateArgs>(args: SelectSubset<T, OtpCreateArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Otps.
     * @param {OtpCreateManyArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otp = await prisma.otp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCreateManyArgs>(args?: SelectSubset<T, OtpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Otps and returns the data saved in the database.
     * @param {OtpCreateManyAndReturnArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otp = await prisma.otp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Otps and only return the `id`
     * const otpWithIdOnly = await prisma.otp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Otp.
     * @param {OtpDeleteArgs} args - Arguments to delete one Otp.
     * @example
     * // Delete one Otp
     * const Otp = await prisma.otp.delete({
     *   where: {
     *     // ... filter to delete one Otp
     *   }
     * })
     * 
     */
    delete<T extends OtpDeleteArgs>(args: SelectSubset<T, OtpDeleteArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Otp.
     * @param {OtpUpdateArgs} args - Arguments to update one Otp.
     * @example
     * // Update one Otp
     * const otp = await prisma.otp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpUpdateArgs>(args: SelectSubset<T, OtpUpdateArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Otps.
     * @param {OtpDeleteManyArgs} args - Arguments to filter Otps to delete.
     * @example
     * // Delete a few Otps
     * const { count } = await prisma.otp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpDeleteManyArgs>(args?: SelectSubset<T, OtpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Otps
     * const otp = await prisma.otp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpUpdateManyArgs>(args: SelectSubset<T, OtpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps and returns the data updated in the database.
     * @param {OtpUpdateManyAndReturnArgs} args - Arguments to update many Otps.
     * @example
     * // Update many Otps
     * const otp = await prisma.otp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Otps and only return the `id`
     * const otpWithIdOnly = await prisma.otp.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Otp.
     * @param {OtpUpsertArgs} args - Arguments to update or create a Otp.
     * @example
     * // Update or create a Otp
     * const otp = await prisma.otp.upsert({
     *   create: {
     *     // ... data to create a Otp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Otp we want to update
     *   }
     * })
     */
    upsert<T extends OtpUpsertArgs>(args: SelectSubset<T, OtpUpsertArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCountArgs} args - Arguments to filter Otps to count.
     * @example
     * // Count the number of Otps
     * const count = await prisma.otp.count({
     *   where: {
     *     // ... the filter for the Otps we want to count
     *   }
     * })
    **/
    count<T extends OtpCountArgs>(
      args?: Subset<T, OtpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Otp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpAggregateArgs>(args: Subset<T, OtpAggregateArgs>): Prisma.PrismaPromise<GetOtpAggregateType<T>>

    /**
     * Group by Otp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpGroupByArgs['orderBy'] }
        : { orderBy?: OtpGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Otp model
   */
  readonly fields: OtpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Otp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Otp model
   */
  interface OtpFieldRefs {
    readonly id: FieldRef<"Otp", 'String'>
    readonly identifier: FieldRef<"Otp", 'String'>
    readonly type: FieldRef<"Otp", 'String'>
    readonly otp: FieldRef<"Otp", 'String'>
    readonly expiresAt: FieldRef<"Otp", 'DateTime'>
    readonly attempts: FieldRef<"Otp", 'Int'>
    readonly verified: FieldRef<"Otp", 'Boolean'>
    readonly purpose: FieldRef<"Otp", 'String'>
    readonly createdAt: FieldRef<"Otp", 'DateTime'>
    readonly updatedAt: FieldRef<"Otp", 'DateTime'>
    readonly isDeleted: FieldRef<"Otp", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Otp findUnique
   */
  export type OtpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp findUniqueOrThrow
   */
  export type OtpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp findFirst
   */
  export type OtpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Otps.
     */
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp findFirstOrThrow
   */
  export type OtpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Otps.
     */
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp findMany
   */
  export type OtpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otps to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp create
   */
  export type OtpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data needed to create a Otp.
     */
    data: XOR<OtpCreateInput, OtpUncheckedCreateInput>
  }

  /**
   * Otp createMany
   */
  export type OtpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Otps.
     */
    data: OtpCreateManyInput | OtpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Otp createManyAndReturn
   */
  export type OtpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data used to create many Otps.
     */
    data: OtpCreateManyInput | OtpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Otp update
   */
  export type OtpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data needed to update a Otp.
     */
    data: XOR<OtpUpdateInput, OtpUncheckedUpdateInput>
    /**
     * Choose, which Otp to update.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp updateMany
   */
  export type OtpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Otps.
     */
    data: XOR<OtpUpdateManyMutationInput, OtpUncheckedUpdateManyInput>
    /**
     * Filter which Otps to update
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to update.
     */
    limit?: number
  }

  /**
   * Otp updateManyAndReturn
   */
  export type OtpUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data used to update Otps.
     */
    data: XOR<OtpUpdateManyMutationInput, OtpUncheckedUpdateManyInput>
    /**
     * Filter which Otps to update
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to update.
     */
    limit?: number
  }

  /**
   * Otp upsert
   */
  export type OtpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The filter to search for the Otp to update in case it exists.
     */
    where: OtpWhereUniqueInput
    /**
     * In case the Otp found by the `where` argument doesn't exist, create a new Otp with this data.
     */
    create: XOR<OtpCreateInput, OtpUncheckedCreateInput>
    /**
     * In case the Otp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpUpdateInput, OtpUncheckedUpdateInput>
  }

  /**
   * Otp delete
   */
  export type OtpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter which Otp to delete.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp deleteMany
   */
  export type OtpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Otps to delete
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to delete.
     */
    limit?: number
  }

  /**
   * Otp without action
   */
  export type OtpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    id: number | null
    foundedYear: number | null
    fitScore: number | null
  }

  export type LeadSumAggregateOutputType = {
    id: number | null
    foundedYear: number | null
    fitScore: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: number | null
    company: string | null
    websiteUrl: string | null
    industry: string | null
    employeeCount: string | null
    revenue: string | null
    hqLocation: string | null
    foundedYear: number | null
    description: string | null
    fitScore: number | null
    status: string | null
    name: string | null
    title: string | null
    email: string | null
    linkedinUrl: string | null
    competitiveLandscape: string | null
    enrichmentScore: string | null
    estimatedToolSpend: string | null
    growthStage: string | null
    budgetTiming: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type LeadMaxAggregateOutputType = {
    id: number | null
    company: string | null
    websiteUrl: string | null
    industry: string | null
    employeeCount: string | null
    revenue: string | null
    hqLocation: string | null
    foundedYear: number | null
    description: string | null
    fitScore: number | null
    status: string | null
    name: string | null
    title: string | null
    email: string | null
    linkedinUrl: string | null
    competitiveLandscape: string | null
    enrichmentScore: string | null
    estimatedToolSpend: string | null
    growthStage: string | null
    budgetTiming: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    company: number
    websiteUrl: number
    industry: number
    employeeCount: number
    revenue: number
    hqLocation: number
    foundedYear: number
    description: number
    fitScore: number
    status: number
    name: number
    title: number
    email: number
    linkedinUrl: number
    techStack: number
    recentNews: number
    painPoints: number
    competitiveLandscape: number
    enrichmentScore: number
    contacts: number
    estimatedToolSpend: number
    growthStage: number
    triggers: number
    buyingIntentSignals: number
    budgetTiming: number
    competitors: number
    outreachSequences: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    id?: true
    foundedYear?: true
    fitScore?: true
  }

  export type LeadSumAggregateInputType = {
    id?: true
    foundedYear?: true
    fitScore?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    company?: true
    websiteUrl?: true
    industry?: true
    employeeCount?: true
    revenue?: true
    hqLocation?: true
    foundedYear?: true
    description?: true
    fitScore?: true
    status?: true
    name?: true
    title?: true
    email?: true
    linkedinUrl?: true
    competitiveLandscape?: true
    enrichmentScore?: true
    estimatedToolSpend?: true
    growthStage?: true
    budgetTiming?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    company?: true
    websiteUrl?: true
    industry?: true
    employeeCount?: true
    revenue?: true
    hqLocation?: true
    foundedYear?: true
    description?: true
    fitScore?: true
    status?: true
    name?: true
    title?: true
    email?: true
    linkedinUrl?: true
    competitiveLandscape?: true
    enrichmentScore?: true
    estimatedToolSpend?: true
    growthStage?: true
    budgetTiming?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    company?: true
    websiteUrl?: true
    industry?: true
    employeeCount?: true
    revenue?: true
    hqLocation?: true
    foundedYear?: true
    description?: true
    fitScore?: true
    status?: true
    name?: true
    title?: true
    email?: true
    linkedinUrl?: true
    techStack?: true
    recentNews?: true
    painPoints?: true
    competitiveLandscape?: true
    enrichmentScore?: true
    contacts?: true
    estimatedToolSpend?: true
    growthStage?: true
    triggers?: true
    buyingIntentSignals?: true
    budgetTiming?: true
    competitors?: true
    outreachSequences?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: number
    company: string
    websiteUrl: string | null
    industry: string | null
    employeeCount: string | null
    revenue: string | null
    hqLocation: string | null
    foundedYear: number | null
    description: string | null
    fitScore: number | null
    status: string
    name: string | null
    title: string | null
    email: string | null
    linkedinUrl: string | null
    techStack: string[]
    recentNews: string[]
    painPoints: string[]
    competitiveLandscape: string | null
    enrichmentScore: string | null
    contacts: JsonValue | null
    estimatedToolSpend: string | null
    growthStage: string | null
    triggers: JsonValue | null
    buyingIntentSignals: string[]
    budgetTiming: string | null
    competitors: JsonValue | null
    outreachSequences: JsonValue | null
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    websiteUrl?: boolean
    industry?: boolean
    employeeCount?: boolean
    revenue?: boolean
    hqLocation?: boolean
    foundedYear?: boolean
    description?: boolean
    fitScore?: boolean
    status?: boolean
    name?: boolean
    title?: boolean
    email?: boolean
    linkedinUrl?: boolean
    techStack?: boolean
    recentNews?: boolean
    painPoints?: boolean
    competitiveLandscape?: boolean
    enrichmentScore?: boolean
    contacts?: boolean
    estimatedToolSpend?: boolean
    growthStage?: boolean
    triggers?: boolean
    buyingIntentSignals?: boolean
    budgetTiming?: boolean
    competitors?: boolean
    outreachSequences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    websiteUrl?: boolean
    industry?: boolean
    employeeCount?: boolean
    revenue?: boolean
    hqLocation?: boolean
    foundedYear?: boolean
    description?: boolean
    fitScore?: boolean
    status?: boolean
    name?: boolean
    title?: boolean
    email?: boolean
    linkedinUrl?: boolean
    techStack?: boolean
    recentNews?: boolean
    painPoints?: boolean
    competitiveLandscape?: boolean
    enrichmentScore?: boolean
    contacts?: boolean
    estimatedToolSpend?: boolean
    growthStage?: boolean
    triggers?: boolean
    buyingIntentSignals?: boolean
    budgetTiming?: boolean
    competitors?: boolean
    outreachSequences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    websiteUrl?: boolean
    industry?: boolean
    employeeCount?: boolean
    revenue?: boolean
    hqLocation?: boolean
    foundedYear?: boolean
    description?: boolean
    fitScore?: boolean
    status?: boolean
    name?: boolean
    title?: boolean
    email?: boolean
    linkedinUrl?: boolean
    techStack?: boolean
    recentNews?: boolean
    painPoints?: boolean
    competitiveLandscape?: boolean
    enrichmentScore?: boolean
    contacts?: boolean
    estimatedToolSpend?: boolean
    growthStage?: boolean
    triggers?: boolean
    buyingIntentSignals?: boolean
    budgetTiming?: boolean
    competitors?: boolean
    outreachSequences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    company?: boolean
    websiteUrl?: boolean
    industry?: boolean
    employeeCount?: boolean
    revenue?: boolean
    hqLocation?: boolean
    foundedYear?: boolean
    description?: boolean
    fitScore?: boolean
    status?: boolean
    name?: boolean
    title?: boolean
    email?: boolean
    linkedinUrl?: boolean
    techStack?: boolean
    recentNews?: boolean
    painPoints?: boolean
    competitiveLandscape?: boolean
    enrichmentScore?: boolean
    contacts?: boolean
    estimatedToolSpend?: boolean
    growthStage?: boolean
    triggers?: boolean
    buyingIntentSignals?: boolean
    budgetTiming?: boolean
    competitors?: boolean
    outreachSequences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company" | "websiteUrl" | "industry" | "employeeCount" | "revenue" | "hqLocation" | "foundedYear" | "description" | "fitScore" | "status" | "name" | "title" | "email" | "linkedinUrl" | "techStack" | "recentNews" | "painPoints" | "competitiveLandscape" | "enrichmentScore" | "contacts" | "estimatedToolSpend" | "growthStage" | "triggers" | "buyingIntentSignals" | "budgetTiming" | "competitors" | "outreachSequences" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["lead"]>

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      company: string
      websiteUrl: string | null
      industry: string | null
      employeeCount: string | null
      revenue: string | null
      hqLocation: string | null
      foundedYear: number | null
      description: string | null
      fitScore: number | null
      status: string
      name: string | null
      title: string | null
      email: string | null
      linkedinUrl: string | null
      techStack: string[]
      recentNews: string[]
      painPoints: string[]
      competitiveLandscape: string | null
      enrichmentScore: string | null
      contacts: Prisma.JsonValue | null
      estimatedToolSpend: string | null
      growthStage: string | null
      triggers: Prisma.JsonValue | null
      buyingIntentSignals: string[]
      budgetTiming: string | null
      competitors: Prisma.JsonValue | null
      outreachSequences: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'Int'>
    readonly company: FieldRef<"Lead", 'String'>
    readonly websiteUrl: FieldRef<"Lead", 'String'>
    readonly industry: FieldRef<"Lead", 'String'>
    readonly employeeCount: FieldRef<"Lead", 'String'>
    readonly revenue: FieldRef<"Lead", 'String'>
    readonly hqLocation: FieldRef<"Lead", 'String'>
    readonly foundedYear: FieldRef<"Lead", 'Int'>
    readonly description: FieldRef<"Lead", 'String'>
    readonly fitScore: FieldRef<"Lead", 'Int'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly name: FieldRef<"Lead", 'String'>
    readonly title: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly linkedinUrl: FieldRef<"Lead", 'String'>
    readonly techStack: FieldRef<"Lead", 'String[]'>
    readonly recentNews: FieldRef<"Lead", 'String[]'>
    readonly painPoints: FieldRef<"Lead", 'String[]'>
    readonly competitiveLandscape: FieldRef<"Lead", 'String'>
    readonly enrichmentScore: FieldRef<"Lead", 'String'>
    readonly contacts: FieldRef<"Lead", 'Json'>
    readonly estimatedToolSpend: FieldRef<"Lead", 'String'>
    readonly growthStage: FieldRef<"Lead", 'String'>
    readonly triggers: FieldRef<"Lead", 'Json'>
    readonly buyingIntentSignals: FieldRef<"Lead", 'String[]'>
    readonly budgetTiming: FieldRef<"Lead", 'String'>
    readonly competitors: FieldRef<"Lead", 'Json'>
    readonly outreachSequences: FieldRef<"Lead", 'Json'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
    readonly isDeleted: FieldRef<"Lead", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
  }


  /**
   * Model ICP
   */

  export type AggregateICP = {
    _count: ICPCountAggregateOutputType | null
    _avg: ICPAvgAggregateOutputType | null
    _sum: ICPSumAggregateOutputType | null
    _min: ICPMinAggregateOutputType | null
    _max: ICPMaxAggregateOutputType | null
  }

  export type ICPAvgAggregateOutputType = {
    id: number | null
  }

  export type ICPSumAggregateOutputType = {
    id: number | null
  }

  export type ICPMinAggregateOutputType = {
    id: number | null
    industry: string | null
    companySize: string | null
    revenueRange: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type ICPMaxAggregateOutputType = {
    id: number | null
    industry: string | null
    companySize: string | null
    revenueRange: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: boolean | null
  }

  export type ICPCountAggregateOutputType = {
    id: number
    industry: number
    companySize: number
    revenueRange: number
    geography: number
    targetJobTitles: number
    technologyKeywords: number
    createdAt: number
    updatedAt: number
    isDeleted: number
    _all: number
  }


  export type ICPAvgAggregateInputType = {
    id?: true
  }

  export type ICPSumAggregateInputType = {
    id?: true
  }

  export type ICPMinAggregateInputType = {
    id?: true
    industry?: true
    companySize?: true
    revenueRange?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type ICPMaxAggregateInputType = {
    id?: true
    industry?: true
    companySize?: true
    revenueRange?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
  }

  export type ICPCountAggregateInputType = {
    id?: true
    industry?: true
    companySize?: true
    revenueRange?: true
    geography?: true
    targetJobTitles?: true
    technologyKeywords?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type ICPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ICP to aggregate.
     */
    where?: ICPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ICPS to fetch.
     */
    orderBy?: ICPOrderByWithRelationInput | ICPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ICPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ICPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ICPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ICPS
    **/
    _count?: true | ICPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ICPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ICPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ICPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ICPMaxAggregateInputType
  }

  export type GetICPAggregateType<T extends ICPAggregateArgs> = {
        [P in keyof T & keyof AggregateICP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateICP[P]>
      : GetScalarType<T[P], AggregateICP[P]>
  }




  export type ICPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ICPWhereInput
    orderBy?: ICPOrderByWithAggregationInput | ICPOrderByWithAggregationInput[]
    by: ICPScalarFieldEnum[] | ICPScalarFieldEnum
    having?: ICPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ICPCountAggregateInputType | true
    _avg?: ICPAvgAggregateInputType
    _sum?: ICPSumAggregateInputType
    _min?: ICPMinAggregateInputType
    _max?: ICPMaxAggregateInputType
  }

  export type ICPGroupByOutputType = {
    id: number
    industry: string | null
    companySize: string | null
    revenueRange: string | null
    geography: string[]
    targetJobTitles: string[]
    technologyKeywords: string[]
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    _count: ICPCountAggregateOutputType | null
    _avg: ICPAvgAggregateOutputType | null
    _sum: ICPSumAggregateOutputType | null
    _min: ICPMinAggregateOutputType | null
    _max: ICPMaxAggregateOutputType | null
  }

  type GetICPGroupByPayload<T extends ICPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ICPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ICPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ICPGroupByOutputType[P]>
            : GetScalarType<T[P], ICPGroupByOutputType[P]>
        }
      >
    >


  export type ICPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    industry?: boolean
    companySize?: boolean
    revenueRange?: boolean
    geography?: boolean
    targetJobTitles?: boolean
    technologyKeywords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["iCP"]>

  export type ICPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    industry?: boolean
    companySize?: boolean
    revenueRange?: boolean
    geography?: boolean
    targetJobTitles?: boolean
    technologyKeywords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["iCP"]>

  export type ICPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    industry?: boolean
    companySize?: boolean
    revenueRange?: boolean
    geography?: boolean
    targetJobTitles?: boolean
    technologyKeywords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }, ExtArgs["result"]["iCP"]>

  export type ICPSelectScalar = {
    id?: boolean
    industry?: boolean
    companySize?: boolean
    revenueRange?: boolean
    geography?: boolean
    targetJobTitles?: boolean
    technologyKeywords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
  }

  export type ICPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "industry" | "companySize" | "revenueRange" | "geography" | "targetJobTitles" | "technologyKeywords" | "createdAt" | "updatedAt" | "isDeleted", ExtArgs["result"]["iCP"]>

  export type $ICPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ICP"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      industry: string | null
      companySize: string | null
      revenueRange: string | null
      geography: string[]
      targetJobTitles: string[]
      technologyKeywords: string[]
      createdAt: Date
      updatedAt: Date
      isDeleted: boolean
    }, ExtArgs["result"]["iCP"]>
    composites: {}
  }

  type ICPGetPayload<S extends boolean | null | undefined | ICPDefaultArgs> = $Result.GetResult<Prisma.$ICPPayload, S>

  type ICPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ICPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ICPCountAggregateInputType | true
    }

  export interface ICPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ICP'], meta: { name: 'ICP' } }
    /**
     * Find zero or one ICP that matches the filter.
     * @param {ICPFindUniqueArgs} args - Arguments to find a ICP
     * @example
     * // Get one ICP
     * const iCP = await prisma.iCP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ICPFindUniqueArgs>(args: SelectSubset<T, ICPFindUniqueArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ICP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ICPFindUniqueOrThrowArgs} args - Arguments to find a ICP
     * @example
     * // Get one ICP
     * const iCP = await prisma.iCP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ICPFindUniqueOrThrowArgs>(args: SelectSubset<T, ICPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ICP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPFindFirstArgs} args - Arguments to find a ICP
     * @example
     * // Get one ICP
     * const iCP = await prisma.iCP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ICPFindFirstArgs>(args?: SelectSubset<T, ICPFindFirstArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ICP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPFindFirstOrThrowArgs} args - Arguments to find a ICP
     * @example
     * // Get one ICP
     * const iCP = await prisma.iCP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ICPFindFirstOrThrowArgs>(args?: SelectSubset<T, ICPFindFirstOrThrowArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ICPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ICPS
     * const iCPS = await prisma.iCP.findMany()
     * 
     * // Get first 10 ICPS
     * const iCPS = await prisma.iCP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const iCPWithIdOnly = await prisma.iCP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ICPFindManyArgs>(args?: SelectSubset<T, ICPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ICP.
     * @param {ICPCreateArgs} args - Arguments to create a ICP.
     * @example
     * // Create one ICP
     * const ICP = await prisma.iCP.create({
     *   data: {
     *     // ... data to create a ICP
     *   }
     * })
     * 
     */
    create<T extends ICPCreateArgs>(args: SelectSubset<T, ICPCreateArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ICPS.
     * @param {ICPCreateManyArgs} args - Arguments to create many ICPS.
     * @example
     * // Create many ICPS
     * const iCP = await prisma.iCP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ICPCreateManyArgs>(args?: SelectSubset<T, ICPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ICPS and returns the data saved in the database.
     * @param {ICPCreateManyAndReturnArgs} args - Arguments to create many ICPS.
     * @example
     * // Create many ICPS
     * const iCP = await prisma.iCP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ICPS and only return the `id`
     * const iCPWithIdOnly = await prisma.iCP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ICPCreateManyAndReturnArgs>(args?: SelectSubset<T, ICPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ICP.
     * @param {ICPDeleteArgs} args - Arguments to delete one ICP.
     * @example
     * // Delete one ICP
     * const ICP = await prisma.iCP.delete({
     *   where: {
     *     // ... filter to delete one ICP
     *   }
     * })
     * 
     */
    delete<T extends ICPDeleteArgs>(args: SelectSubset<T, ICPDeleteArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ICP.
     * @param {ICPUpdateArgs} args - Arguments to update one ICP.
     * @example
     * // Update one ICP
     * const iCP = await prisma.iCP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ICPUpdateArgs>(args: SelectSubset<T, ICPUpdateArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ICPS.
     * @param {ICPDeleteManyArgs} args - Arguments to filter ICPS to delete.
     * @example
     * // Delete a few ICPS
     * const { count } = await prisma.iCP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ICPDeleteManyArgs>(args?: SelectSubset<T, ICPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ICPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ICPS
     * const iCP = await prisma.iCP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ICPUpdateManyArgs>(args: SelectSubset<T, ICPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ICPS and returns the data updated in the database.
     * @param {ICPUpdateManyAndReturnArgs} args - Arguments to update many ICPS.
     * @example
     * // Update many ICPS
     * const iCP = await prisma.iCP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ICPS and only return the `id`
     * const iCPWithIdOnly = await prisma.iCP.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ICPUpdateManyAndReturnArgs>(args: SelectSubset<T, ICPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ICP.
     * @param {ICPUpsertArgs} args - Arguments to update or create a ICP.
     * @example
     * // Update or create a ICP
     * const iCP = await prisma.iCP.upsert({
     *   create: {
     *     // ... data to create a ICP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ICP we want to update
     *   }
     * })
     */
    upsert<T extends ICPUpsertArgs>(args: SelectSubset<T, ICPUpsertArgs<ExtArgs>>): Prisma__ICPClient<$Result.GetResult<Prisma.$ICPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ICPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPCountArgs} args - Arguments to filter ICPS to count.
     * @example
     * // Count the number of ICPS
     * const count = await prisma.iCP.count({
     *   where: {
     *     // ... the filter for the ICPS we want to count
     *   }
     * })
    **/
    count<T extends ICPCountArgs>(
      args?: Subset<T, ICPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ICPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ICP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ICPAggregateArgs>(args: Subset<T, ICPAggregateArgs>): Prisma.PrismaPromise<GetICPAggregateType<T>>

    /**
     * Group by ICP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ICPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ICPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ICPGroupByArgs['orderBy'] }
        : { orderBy?: ICPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ICPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetICPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ICP model
   */
  readonly fields: ICPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ICP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ICPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ICP model
   */
  interface ICPFieldRefs {
    readonly id: FieldRef<"ICP", 'Int'>
    readonly industry: FieldRef<"ICP", 'String'>
    readonly companySize: FieldRef<"ICP", 'String'>
    readonly revenueRange: FieldRef<"ICP", 'String'>
    readonly geography: FieldRef<"ICP", 'String[]'>
    readonly targetJobTitles: FieldRef<"ICP", 'String[]'>
    readonly technologyKeywords: FieldRef<"ICP", 'String[]'>
    readonly createdAt: FieldRef<"ICP", 'DateTime'>
    readonly updatedAt: FieldRef<"ICP", 'DateTime'>
    readonly isDeleted: FieldRef<"ICP", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ICP findUnique
   */
  export type ICPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * Filter, which ICP to fetch.
     */
    where: ICPWhereUniqueInput
  }

  /**
   * ICP findUniqueOrThrow
   */
  export type ICPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * Filter, which ICP to fetch.
     */
    where: ICPWhereUniqueInput
  }

  /**
   * ICP findFirst
   */
  export type ICPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * Filter, which ICP to fetch.
     */
    where?: ICPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ICPS to fetch.
     */
    orderBy?: ICPOrderByWithRelationInput | ICPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ICPS.
     */
    cursor?: ICPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ICPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ICPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ICPS.
     */
    distinct?: ICPScalarFieldEnum | ICPScalarFieldEnum[]
  }

  /**
   * ICP findFirstOrThrow
   */
  export type ICPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * Filter, which ICP to fetch.
     */
    where?: ICPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ICPS to fetch.
     */
    orderBy?: ICPOrderByWithRelationInput | ICPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ICPS.
     */
    cursor?: ICPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ICPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ICPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ICPS.
     */
    distinct?: ICPScalarFieldEnum | ICPScalarFieldEnum[]
  }

  /**
   * ICP findMany
   */
  export type ICPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * Filter, which ICPS to fetch.
     */
    where?: ICPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ICPS to fetch.
     */
    orderBy?: ICPOrderByWithRelationInput | ICPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ICPS.
     */
    cursor?: ICPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ICPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ICPS.
     */
    skip?: number
    distinct?: ICPScalarFieldEnum | ICPScalarFieldEnum[]
  }

  /**
   * ICP create
   */
  export type ICPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * The data needed to create a ICP.
     */
    data: XOR<ICPCreateInput, ICPUncheckedCreateInput>
  }

  /**
   * ICP createMany
   */
  export type ICPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ICPS.
     */
    data: ICPCreateManyInput | ICPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ICP createManyAndReturn
   */
  export type ICPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * The data used to create many ICPS.
     */
    data: ICPCreateManyInput | ICPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ICP update
   */
  export type ICPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * The data needed to update a ICP.
     */
    data: XOR<ICPUpdateInput, ICPUncheckedUpdateInput>
    /**
     * Choose, which ICP to update.
     */
    where: ICPWhereUniqueInput
  }

  /**
   * ICP updateMany
   */
  export type ICPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ICPS.
     */
    data: XOR<ICPUpdateManyMutationInput, ICPUncheckedUpdateManyInput>
    /**
     * Filter which ICPS to update
     */
    where?: ICPWhereInput
    /**
     * Limit how many ICPS to update.
     */
    limit?: number
  }

  /**
   * ICP updateManyAndReturn
   */
  export type ICPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * The data used to update ICPS.
     */
    data: XOR<ICPUpdateManyMutationInput, ICPUncheckedUpdateManyInput>
    /**
     * Filter which ICPS to update
     */
    where?: ICPWhereInput
    /**
     * Limit how many ICPS to update.
     */
    limit?: number
  }

  /**
   * ICP upsert
   */
  export type ICPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * The filter to search for the ICP to update in case it exists.
     */
    where: ICPWhereUniqueInput
    /**
     * In case the ICP found by the `where` argument doesn't exist, create a new ICP with this data.
     */
    create: XOR<ICPCreateInput, ICPUncheckedCreateInput>
    /**
     * In case the ICP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ICPUpdateInput, ICPUncheckedUpdateInput>
  }

  /**
   * ICP delete
   */
  export type ICPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
    /**
     * Filter which ICP to delete.
     */
    where: ICPWhereUniqueInput
  }

  /**
   * ICP deleteMany
   */
  export type ICPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ICPS to delete
     */
    where?: ICPWhereInput
    /**
     * Limit how many ICPS to delete.
     */
    limit?: number
  }

  /**
   * ICP without action
   */
  export type ICPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ICP
     */
    select?: ICPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ICP
     */
    omit?: ICPOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    isDeleted: 'isDeleted'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserIdentityScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerId: 'providerId',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type UserIdentityScalarFieldEnum = (typeof UserIdentityScalarFieldEnum)[keyof typeof UserIdentityScalarFieldEnum]


  export const OtpScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    type: 'type',
    otp: 'otp',
    expiresAt: 'expiresAt',
    attempts: 'attempts',
    verified: 'verified',
    purpose: 'purpose',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type OtpScalarFieldEnum = (typeof OtpScalarFieldEnum)[keyof typeof OtpScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    company: 'company',
    websiteUrl: 'websiteUrl',
    industry: 'industry',
    employeeCount: 'employeeCount',
    revenue: 'revenue',
    hqLocation: 'hqLocation',
    foundedYear: 'foundedYear',
    description: 'description',
    fitScore: 'fitScore',
    status: 'status',
    name: 'name',
    title: 'title',
    email: 'email',
    linkedinUrl: 'linkedinUrl',
    techStack: 'techStack',
    recentNews: 'recentNews',
    painPoints: 'painPoints',
    competitiveLandscape: 'competitiveLandscape',
    enrichmentScore: 'enrichmentScore',
    contacts: 'contacts',
    estimatedToolSpend: 'estimatedToolSpend',
    growthStage: 'growthStage',
    triggers: 'triggers',
    buyingIntentSignals: 'buyingIntentSignals',
    budgetTiming: 'budgetTiming',
    competitors: 'competitors',
    outreachSequences: 'outreachSequences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const ICPScalarFieldEnum: {
    id: 'id',
    industry: 'industry',
    companySize: 'companySize',
    revenueRange: 'revenueRange',
    geography: 'geography',
    targetJobTitles: 'targetJobTitles',
    technologyKeywords: 'technologyKeywords',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted'
  };

  export type ICPScalarFieldEnum = (typeof ICPScalarFieldEnum)[keyof typeof ICPScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    isDeleted?: BoolNullableFilter<"User"> | boolean | null
    identities?: UserIdentityListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    identities?: UserIdentityOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    isDeleted?: BoolNullableFilter<"User"> | boolean | null
    identities?: UserIdentityListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isDeleted?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
  }

  export type UserIdentityWhereInput = {
    AND?: UserIdentityWhereInput | UserIdentityWhereInput[]
    OR?: UserIdentityWhereInput[]
    NOT?: UserIdentityWhereInput | UserIdentityWhereInput[]
    id?: StringFilter<"UserIdentity"> | string
    userId?: StringFilter<"UserIdentity"> | string
    provider?: StringFilter<"UserIdentity"> | string
    providerId?: StringFilter<"UserIdentity"> | string
    metadata?: JsonNullableFilter<"UserIdentity">
    createdAt?: DateTimeFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableFilter<"UserIdentity"> | boolean | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserIdentityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerId?: UserIdentityProviderProviderIdCompoundUniqueInput
    AND?: UserIdentityWhereInput | UserIdentityWhereInput[]
    OR?: UserIdentityWhereInput[]
    NOT?: UserIdentityWhereInput | UserIdentityWhereInput[]
    userId?: StringFilter<"UserIdentity"> | string
    provider?: StringFilter<"UserIdentity"> | string
    providerId?: StringFilter<"UserIdentity"> | string
    metadata?: JsonNullableFilter<"UserIdentity">
    createdAt?: DateTimeFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableFilter<"UserIdentity"> | boolean | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerId">

  export type UserIdentityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    _count?: UserIdentityCountOrderByAggregateInput
    _max?: UserIdentityMaxOrderByAggregateInput
    _min?: UserIdentityMinOrderByAggregateInput
  }

  export type UserIdentityScalarWhereWithAggregatesInput = {
    AND?: UserIdentityScalarWhereWithAggregatesInput | UserIdentityScalarWhereWithAggregatesInput[]
    OR?: UserIdentityScalarWhereWithAggregatesInput[]
    NOT?: UserIdentityScalarWhereWithAggregatesInput | UserIdentityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserIdentity"> | string
    userId?: StringWithAggregatesFilter<"UserIdentity"> | string
    provider?: StringWithAggregatesFilter<"UserIdentity"> | string
    providerId?: StringWithAggregatesFilter<"UserIdentity"> | string
    metadata?: JsonNullableWithAggregatesFilter<"UserIdentity">
    createdAt?: DateTimeWithAggregatesFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableWithAggregatesFilter<"UserIdentity"> | boolean | null
  }

  export type OtpWhereInput = {
    AND?: OtpWhereInput | OtpWhereInput[]
    OR?: OtpWhereInput[]
    NOT?: OtpWhereInput | OtpWhereInput[]
    id?: StringFilter<"Otp"> | string
    identifier?: StringFilter<"Otp"> | string
    type?: StringFilter<"Otp"> | string
    otp?: StringFilter<"Otp"> | string
    expiresAt?: DateTimeFilter<"Otp"> | Date | string
    attempts?: IntFilter<"Otp"> | number
    verified?: BoolFilter<"Otp"> | boolean
    purpose?: StringNullableFilter<"Otp"> | string | null
    createdAt?: DateTimeFilter<"Otp"> | Date | string
    updatedAt?: DateTimeFilter<"Otp"> | Date | string
    isDeleted?: BoolNullableFilter<"Otp"> | boolean | null
  }

  export type OtpOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
  }

  export type OtpWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpWhereInput | OtpWhereInput[]
    OR?: OtpWhereInput[]
    NOT?: OtpWhereInput | OtpWhereInput[]
    identifier?: StringFilter<"Otp"> | string
    type?: StringFilter<"Otp"> | string
    otp?: StringFilter<"Otp"> | string
    expiresAt?: DateTimeFilter<"Otp"> | Date | string
    attempts?: IntFilter<"Otp"> | number
    verified?: BoolFilter<"Otp"> | boolean
    purpose?: StringNullableFilter<"Otp"> | string | null
    createdAt?: DateTimeFilter<"Otp"> | Date | string
    updatedAt?: DateTimeFilter<"Otp"> | Date | string
    isDeleted?: BoolNullableFilter<"Otp"> | boolean | null
  }, "id">

  export type OtpOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrderInput | SortOrder
    _count?: OtpCountOrderByAggregateInput
    _avg?: OtpAvgOrderByAggregateInput
    _max?: OtpMaxOrderByAggregateInput
    _min?: OtpMinOrderByAggregateInput
    _sum?: OtpSumOrderByAggregateInput
  }

  export type OtpScalarWhereWithAggregatesInput = {
    AND?: OtpScalarWhereWithAggregatesInput | OtpScalarWhereWithAggregatesInput[]
    OR?: OtpScalarWhereWithAggregatesInput[]
    NOT?: OtpScalarWhereWithAggregatesInput | OtpScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Otp"> | string
    identifier?: StringWithAggregatesFilter<"Otp"> | string
    type?: StringWithAggregatesFilter<"Otp"> | string
    otp?: StringWithAggregatesFilter<"Otp"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    attempts?: IntWithAggregatesFilter<"Otp"> | number
    verified?: BoolWithAggregatesFilter<"Otp"> | boolean
    purpose?: StringNullableWithAggregatesFilter<"Otp"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    isDeleted?: BoolNullableWithAggregatesFilter<"Otp"> | boolean | null
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: IntFilter<"Lead"> | number
    company?: StringFilter<"Lead"> | string
    websiteUrl?: StringNullableFilter<"Lead"> | string | null
    industry?: StringNullableFilter<"Lead"> | string | null
    employeeCount?: StringNullableFilter<"Lead"> | string | null
    revenue?: StringNullableFilter<"Lead"> | string | null
    hqLocation?: StringNullableFilter<"Lead"> | string | null
    foundedYear?: IntNullableFilter<"Lead"> | number | null
    description?: StringNullableFilter<"Lead"> | string | null
    fitScore?: IntNullableFilter<"Lead"> | number | null
    status?: StringFilter<"Lead"> | string
    name?: StringNullableFilter<"Lead"> | string | null
    title?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    techStack?: StringNullableListFilter<"Lead">
    recentNews?: StringNullableListFilter<"Lead">
    painPoints?: StringNullableListFilter<"Lead">
    competitiveLandscape?: StringNullableFilter<"Lead"> | string | null
    enrichmentScore?: StringNullableFilter<"Lead"> | string | null
    contacts?: JsonNullableFilter<"Lead">
    estimatedToolSpend?: StringNullableFilter<"Lead"> | string | null
    growthStage?: StringNullableFilter<"Lead"> | string | null
    triggers?: JsonNullableFilter<"Lead">
    buyingIntentSignals?: StringNullableListFilter<"Lead">
    budgetTiming?: StringNullableFilter<"Lead"> | string | null
    competitors?: JsonNullableFilter<"Lead">
    outreachSequences?: JsonNullableFilter<"Lead">
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    isDeleted?: BoolFilter<"Lead"> | boolean
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    company?: SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    employeeCount?: SortOrderInput | SortOrder
    revenue?: SortOrderInput | SortOrder
    hqLocation?: SortOrderInput | SortOrder
    foundedYear?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    fitScore?: SortOrderInput | SortOrder
    status?: SortOrder
    name?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    techStack?: SortOrder
    recentNews?: SortOrder
    painPoints?: SortOrder
    competitiveLandscape?: SortOrderInput | SortOrder
    enrichmentScore?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    estimatedToolSpend?: SortOrderInput | SortOrder
    growthStage?: SortOrderInput | SortOrder
    triggers?: SortOrderInput | SortOrder
    buyingIntentSignals?: SortOrder
    budgetTiming?: SortOrderInput | SortOrder
    competitors?: SortOrderInput | SortOrder
    outreachSequences?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    company?: StringFilter<"Lead"> | string
    websiteUrl?: StringNullableFilter<"Lead"> | string | null
    industry?: StringNullableFilter<"Lead"> | string | null
    employeeCount?: StringNullableFilter<"Lead"> | string | null
    revenue?: StringNullableFilter<"Lead"> | string | null
    hqLocation?: StringNullableFilter<"Lead"> | string | null
    foundedYear?: IntNullableFilter<"Lead"> | number | null
    description?: StringNullableFilter<"Lead"> | string | null
    fitScore?: IntNullableFilter<"Lead"> | number | null
    status?: StringFilter<"Lead"> | string
    name?: StringNullableFilter<"Lead"> | string | null
    title?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    techStack?: StringNullableListFilter<"Lead">
    recentNews?: StringNullableListFilter<"Lead">
    painPoints?: StringNullableListFilter<"Lead">
    competitiveLandscape?: StringNullableFilter<"Lead"> | string | null
    enrichmentScore?: StringNullableFilter<"Lead"> | string | null
    contacts?: JsonNullableFilter<"Lead">
    estimatedToolSpend?: StringNullableFilter<"Lead"> | string | null
    growthStage?: StringNullableFilter<"Lead"> | string | null
    triggers?: JsonNullableFilter<"Lead">
    buyingIntentSignals?: StringNullableListFilter<"Lead">
    budgetTiming?: StringNullableFilter<"Lead"> | string | null
    competitors?: JsonNullableFilter<"Lead">
    outreachSequences?: JsonNullableFilter<"Lead">
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    isDeleted?: BoolFilter<"Lead"> | boolean
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    company?: SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    employeeCount?: SortOrderInput | SortOrder
    revenue?: SortOrderInput | SortOrder
    hqLocation?: SortOrderInput | SortOrder
    foundedYear?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    fitScore?: SortOrderInput | SortOrder
    status?: SortOrder
    name?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    techStack?: SortOrder
    recentNews?: SortOrder
    painPoints?: SortOrder
    competitiveLandscape?: SortOrderInput | SortOrder
    enrichmentScore?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    estimatedToolSpend?: SortOrderInput | SortOrder
    growthStage?: SortOrderInput | SortOrder
    triggers?: SortOrderInput | SortOrder
    buyingIntentSignals?: SortOrder
    budgetTiming?: SortOrderInput | SortOrder
    competitors?: SortOrderInput | SortOrder
    outreachSequences?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lead"> | number
    company?: StringWithAggregatesFilter<"Lead"> | string
    websiteUrl?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    employeeCount?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    revenue?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    hqLocation?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    foundedYear?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    description?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    fitScore?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    status?: StringWithAggregatesFilter<"Lead"> | string
    name?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    title?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    techStack?: StringNullableListFilter<"Lead">
    recentNews?: StringNullableListFilter<"Lead">
    painPoints?: StringNullableListFilter<"Lead">
    competitiveLandscape?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    enrichmentScore?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    contacts?: JsonNullableWithAggregatesFilter<"Lead">
    estimatedToolSpend?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    growthStage?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    triggers?: JsonNullableWithAggregatesFilter<"Lead">
    buyingIntentSignals?: StringNullableListFilter<"Lead">
    budgetTiming?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    competitors?: JsonNullableWithAggregatesFilter<"Lead">
    outreachSequences?: JsonNullableWithAggregatesFilter<"Lead">
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Lead"> | boolean
  }

  export type ICPWhereInput = {
    AND?: ICPWhereInput | ICPWhereInput[]
    OR?: ICPWhereInput[]
    NOT?: ICPWhereInput | ICPWhereInput[]
    id?: IntFilter<"ICP"> | number
    industry?: StringNullableFilter<"ICP"> | string | null
    companySize?: StringNullableFilter<"ICP"> | string | null
    revenueRange?: StringNullableFilter<"ICP"> | string | null
    geography?: StringNullableListFilter<"ICP">
    targetJobTitles?: StringNullableListFilter<"ICP">
    technologyKeywords?: StringNullableListFilter<"ICP">
    createdAt?: DateTimeFilter<"ICP"> | Date | string
    updatedAt?: DateTimeFilter<"ICP"> | Date | string
    isDeleted?: BoolFilter<"ICP"> | boolean
  }

  export type ICPOrderByWithRelationInput = {
    id?: SortOrder
    industry?: SortOrderInput | SortOrder
    companySize?: SortOrderInput | SortOrder
    revenueRange?: SortOrderInput | SortOrder
    geography?: SortOrder
    targetJobTitles?: SortOrder
    technologyKeywords?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ICPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ICPWhereInput | ICPWhereInput[]
    OR?: ICPWhereInput[]
    NOT?: ICPWhereInput | ICPWhereInput[]
    industry?: StringNullableFilter<"ICP"> | string | null
    companySize?: StringNullableFilter<"ICP"> | string | null
    revenueRange?: StringNullableFilter<"ICP"> | string | null
    geography?: StringNullableListFilter<"ICP">
    targetJobTitles?: StringNullableListFilter<"ICP">
    technologyKeywords?: StringNullableListFilter<"ICP">
    createdAt?: DateTimeFilter<"ICP"> | Date | string
    updatedAt?: DateTimeFilter<"ICP"> | Date | string
    isDeleted?: BoolFilter<"ICP"> | boolean
  }, "id">

  export type ICPOrderByWithAggregationInput = {
    id?: SortOrder
    industry?: SortOrderInput | SortOrder
    companySize?: SortOrderInput | SortOrder
    revenueRange?: SortOrderInput | SortOrder
    geography?: SortOrder
    targetJobTitles?: SortOrder
    technologyKeywords?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    _count?: ICPCountOrderByAggregateInput
    _avg?: ICPAvgOrderByAggregateInput
    _max?: ICPMaxOrderByAggregateInput
    _min?: ICPMinOrderByAggregateInput
    _sum?: ICPSumOrderByAggregateInput
  }

  export type ICPScalarWhereWithAggregatesInput = {
    AND?: ICPScalarWhereWithAggregatesInput | ICPScalarWhereWithAggregatesInput[]
    OR?: ICPScalarWhereWithAggregatesInput[]
    NOT?: ICPScalarWhereWithAggregatesInput | ICPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ICP"> | number
    industry?: StringNullableWithAggregatesFilter<"ICP"> | string | null
    companySize?: StringNullableWithAggregatesFilter<"ICP"> | string | null
    revenueRange?: StringNullableWithAggregatesFilter<"ICP"> | string | null
    geography?: StringNullableListFilter<"ICP">
    targetJobTitles?: StringNullableListFilter<"ICP">
    technologyKeywords?: StringNullableListFilter<"ICP">
    createdAt?: DateTimeWithAggregatesFilter<"ICP"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ICP"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"ICP"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
    identities?: UserIdentityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityCreateInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
    user: UserCreateNestedOneWithoutIdentitiesInput
  }

  export type UserIdentityUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    user?: UserUpdateOneRequiredWithoutIdentitiesNestedInput
  }

  export type UserIdentityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityCreateManyInput = {
    id?: string
    userId: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpCreateInput = {
    id?: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    verified?: boolean
    purpose?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type OtpUncheckedCreateInput = {
    id?: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    verified?: boolean
    purpose?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type OtpUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpCreateManyInput = {
    id?: string
    identifier: string
    type: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    verified?: boolean
    purpose?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type OtpUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OtpUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type LeadCreateInput = {
    company: string
    websiteUrl?: string | null
    industry?: string | null
    employeeCount?: string | null
    revenue?: string | null
    hqLocation?: string | null
    foundedYear?: number | null
    description?: string | null
    fitScore?: number | null
    status?: string
    name?: string | null
    title?: string | null
    email?: string | null
    linkedinUrl?: string | null
    techStack?: LeadCreatetechStackInput | string[]
    recentNews?: LeadCreaterecentNewsInput | string[]
    painPoints?: LeadCreatepainPointsInput | string[]
    competitiveLandscape?: string | null
    enrichmentScore?: string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: string | null
    growthStage?: string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadCreatebuyingIntentSignalsInput | string[]
    budgetTiming?: string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LeadUncheckedCreateInput = {
    id?: number
    company: string
    websiteUrl?: string | null
    industry?: string | null
    employeeCount?: string | null
    revenue?: string | null
    hqLocation?: string | null
    foundedYear?: number | null
    description?: string | null
    fitScore?: number | null
    status?: string
    name?: string | null
    title?: string | null
    email?: string | null
    linkedinUrl?: string | null
    techStack?: LeadCreatetechStackInput | string[]
    recentNews?: LeadCreaterecentNewsInput | string[]
    painPoints?: LeadCreatepainPointsInput | string[]
    competitiveLandscape?: string | null
    enrichmentScore?: string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: string | null
    growthStage?: string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadCreatebuyingIntentSignalsInput | string[]
    budgetTiming?: string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LeadUpdateInput = {
    company?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employeeCount?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    hqLocation?: NullableStringFieldUpdateOperationsInput | string | null
    foundedYear?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fitScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: LeadUpdatetechStackInput | string[]
    recentNews?: LeadUpdaterecentNewsInput | string[]
    painPoints?: LeadUpdatepainPointsInput | string[]
    competitiveLandscape?: NullableStringFieldUpdateOperationsInput | string | null
    enrichmentScore?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: NullableStringFieldUpdateOperationsInput | string | null
    growthStage?: NullableStringFieldUpdateOperationsInput | string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadUpdatebuyingIntentSignalsInput | string[]
    budgetTiming?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employeeCount?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    hqLocation?: NullableStringFieldUpdateOperationsInput | string | null
    foundedYear?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fitScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: LeadUpdatetechStackInput | string[]
    recentNews?: LeadUpdaterecentNewsInput | string[]
    painPoints?: LeadUpdatepainPointsInput | string[]
    competitiveLandscape?: NullableStringFieldUpdateOperationsInput | string | null
    enrichmentScore?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: NullableStringFieldUpdateOperationsInput | string | null
    growthStage?: NullableStringFieldUpdateOperationsInput | string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadUpdatebuyingIntentSignalsInput | string[]
    budgetTiming?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeadCreateManyInput = {
    id?: number
    company: string
    websiteUrl?: string | null
    industry?: string | null
    employeeCount?: string | null
    revenue?: string | null
    hqLocation?: string | null
    foundedYear?: number | null
    description?: string | null
    fitScore?: number | null
    status?: string
    name?: string | null
    title?: string | null
    email?: string | null
    linkedinUrl?: string | null
    techStack?: LeadCreatetechStackInput | string[]
    recentNews?: LeadCreaterecentNewsInput | string[]
    painPoints?: LeadCreatepainPointsInput | string[]
    competitiveLandscape?: string | null
    enrichmentScore?: string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: string | null
    growthStage?: string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadCreatebuyingIntentSignalsInput | string[]
    budgetTiming?: string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type LeadUpdateManyMutationInput = {
    company?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employeeCount?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    hqLocation?: NullableStringFieldUpdateOperationsInput | string | null
    foundedYear?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fitScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: LeadUpdatetechStackInput | string[]
    recentNews?: LeadUpdaterecentNewsInput | string[]
    painPoints?: LeadUpdatepainPointsInput | string[]
    competitiveLandscape?: NullableStringFieldUpdateOperationsInput | string | null
    enrichmentScore?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: NullableStringFieldUpdateOperationsInput | string | null
    growthStage?: NullableStringFieldUpdateOperationsInput | string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadUpdatebuyingIntentSignalsInput | string[]
    budgetTiming?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employeeCount?: NullableStringFieldUpdateOperationsInput | string | null
    revenue?: NullableStringFieldUpdateOperationsInput | string | null
    hqLocation?: NullableStringFieldUpdateOperationsInput | string | null
    foundedYear?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fitScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: LeadUpdatetechStackInput | string[]
    recentNews?: LeadUpdaterecentNewsInput | string[]
    painPoints?: LeadUpdatepainPointsInput | string[]
    competitiveLandscape?: NullableStringFieldUpdateOperationsInput | string | null
    enrichmentScore?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableJsonNullValueInput | InputJsonValue
    estimatedToolSpend?: NullableStringFieldUpdateOperationsInput | string | null
    growthStage?: NullableStringFieldUpdateOperationsInput | string | null
    triggers?: NullableJsonNullValueInput | InputJsonValue
    buyingIntentSignals?: LeadUpdatebuyingIntentSignalsInput | string[]
    budgetTiming?: NullableStringFieldUpdateOperationsInput | string | null
    competitors?: NullableJsonNullValueInput | InputJsonValue
    outreachSequences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ICPCreateInput = {
    industry?: string | null
    companySize?: string | null
    revenueRange?: string | null
    geography?: ICPCreategeographyInput | string[]
    targetJobTitles?: ICPCreatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPCreatetechnologyKeywordsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ICPUncheckedCreateInput = {
    id?: number
    industry?: string | null
    companySize?: string | null
    revenueRange?: string | null
    geography?: ICPCreategeographyInput | string[]
    targetJobTitles?: ICPCreatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPCreatetechnologyKeywordsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ICPUpdateInput = {
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    revenueRange?: NullableStringFieldUpdateOperationsInput | string | null
    geography?: ICPUpdategeographyInput | string[]
    targetJobTitles?: ICPUpdatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPUpdatetechnologyKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ICPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    revenueRange?: NullableStringFieldUpdateOperationsInput | string | null
    geography?: ICPUpdategeographyInput | string[]
    targetJobTitles?: ICPUpdatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPUpdatetechnologyKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ICPCreateManyInput = {
    id?: number
    industry?: string | null
    companySize?: string | null
    revenueRange?: string | null
    geography?: ICPCreategeographyInput | string[]
    targetJobTitles?: ICPCreatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPCreatetechnologyKeywordsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean
  }

  export type ICPUpdateManyMutationInput = {
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    revenueRange?: NullableStringFieldUpdateOperationsInput | string | null
    geography?: ICPUpdategeographyInput | string[]
    targetJobTitles?: ICPUpdatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPUpdatetechnologyKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ICPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    revenueRange?: NullableStringFieldUpdateOperationsInput | string | null
    geography?: ICPUpdategeographyInput | string[]
    targetJobTitles?: ICPUpdatetargetJobTitlesInput | string[]
    technologyKeywords?: ICPUpdatetechnologyKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UserIdentityListRelationFilter = {
    every?: UserIdentityWhereInput
    some?: UserIdentityWhereInput
    none?: UserIdentityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserIdentityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserIdentityProviderProviderIdCompoundUniqueInput = {
    provider: string
    providerId: string
  }

  export type UserIdentityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserIdentityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type UserIdentityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OtpCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type OtpAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type OtpMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type OtpMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    verified?: SortOrder
    purpose?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type OtpSumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    websiteUrl?: SortOrder
    industry?: SortOrder
    employeeCount?: SortOrder
    revenue?: SortOrder
    hqLocation?: SortOrder
    foundedYear?: SortOrder
    description?: SortOrder
    fitScore?: SortOrder
    status?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    linkedinUrl?: SortOrder
    techStack?: SortOrder
    recentNews?: SortOrder
    painPoints?: SortOrder
    competitiveLandscape?: SortOrder
    enrichmentScore?: SortOrder
    contacts?: SortOrder
    estimatedToolSpend?: SortOrder
    growthStage?: SortOrder
    triggers?: SortOrder
    buyingIntentSignals?: SortOrder
    budgetTiming?: SortOrder
    competitors?: SortOrder
    outreachSequences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    id?: SortOrder
    foundedYear?: SortOrder
    fitScore?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    websiteUrl?: SortOrder
    industry?: SortOrder
    employeeCount?: SortOrder
    revenue?: SortOrder
    hqLocation?: SortOrder
    foundedYear?: SortOrder
    description?: SortOrder
    fitScore?: SortOrder
    status?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    linkedinUrl?: SortOrder
    competitiveLandscape?: SortOrder
    enrichmentScore?: SortOrder
    estimatedToolSpend?: SortOrder
    growthStage?: SortOrder
    budgetTiming?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    websiteUrl?: SortOrder
    industry?: SortOrder
    employeeCount?: SortOrder
    revenue?: SortOrder
    hqLocation?: SortOrder
    foundedYear?: SortOrder
    description?: SortOrder
    fitScore?: SortOrder
    status?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    linkedinUrl?: SortOrder
    competitiveLandscape?: SortOrder
    enrichmentScore?: SortOrder
    estimatedToolSpend?: SortOrder
    growthStage?: SortOrder
    budgetTiming?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    id?: SortOrder
    foundedYear?: SortOrder
    fitScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ICPCountOrderByAggregateInput = {
    id?: SortOrder
    industry?: SortOrder
    companySize?: SortOrder
    revenueRange?: SortOrder
    geography?: SortOrder
    targetJobTitles?: SortOrder
    technologyKeywords?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ICPAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ICPMaxOrderByAggregateInput = {
    id?: SortOrder
    industry?: SortOrder
    companySize?: SortOrder
    revenueRange?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ICPMinOrderByAggregateInput = {
    id?: SortOrder
    industry?: SortOrder
    companySize?: SortOrder
    revenueRange?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ICPSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserIdentityCreateNestedManyWithoutUserInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
  }

  export type UserIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserIdentityUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    upsert?: UserIdentityUpsertWithWhereUniqueWithoutUserInput | UserIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    set?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    disconnect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    delete?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    update?: UserIdentityUpdateWithWhereUniqueWithoutUserInput | UserIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserIdentityUpdateManyWithWhereWithoutUserInput | UserIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
  }

  export type UserIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    upsert?: UserIdentityUpsertWithWhereUniqueWithoutUserInput | UserIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    set?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    disconnect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    delete?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    update?: UserIdentityUpdateWithWhereUniqueWithoutUserInput | UserIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserIdentityUpdateManyWithWhereWithoutUserInput | UserIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutIdentitiesInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutIdentitiesNestedInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    upsert?: UserUpsertWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutIdentitiesInput, UserUpdateWithoutIdentitiesInput>, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LeadCreatetechStackInput = {
    set: string[]
  }

  export type LeadCreaterecentNewsInput = {
    set: string[]
  }

  export type LeadCreatepainPointsInput = {
    set: string[]
  }

  export type LeadCreatebuyingIntentSignalsInput = {
    set: string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeadUpdatetechStackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LeadUpdaterecentNewsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LeadUpdatepainPointsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LeadUpdatebuyingIntentSignalsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ICPCreategeographyInput = {
    set: string[]
  }

  export type ICPCreatetargetJobTitlesInput = {
    set: string[]
  }

  export type ICPCreatetechnologyKeywordsInput = {
    set: string[]
  }

  export type ICPUpdategeographyInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ICPUpdatetargetJobTitlesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ICPUpdatetechnologyKeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserIdentityCreateWithoutUserInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityCreateOrConnectWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    create: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput>
  }

  export type UserIdentityCreateManyUserInputEnvelope = {
    data: UserIdentityCreateManyUserInput | UserIdentityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    update: XOR<UserIdentityUpdateWithoutUserInput, UserIdentityUncheckedUpdateWithoutUserInput>
    create: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput>
  }

  export type UserIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    data: XOR<UserIdentityUpdateWithoutUserInput, UserIdentityUncheckedUpdateWithoutUserInput>
  }

  export type UserIdentityUpdateManyWithWhereWithoutUserInput = {
    where: UserIdentityScalarWhereInput
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyWithoutUserInput>
  }

  export type UserIdentityScalarWhereInput = {
    AND?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
    OR?: UserIdentityScalarWhereInput[]
    NOT?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
    id?: StringFilter<"UserIdentity"> | string
    userId?: StringFilter<"UserIdentity"> | string
    provider?: StringFilter<"UserIdentity"> | string
    providerId?: StringFilter<"UserIdentity"> | string
    metadata?: JsonNullableFilter<"UserIdentity">
    createdAt?: DateTimeFilter<"UserIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    isDeleted?: BoolNullableFilter<"UserIdentity"> | boolean | null
  }

  export type UserCreateWithoutIdentitiesInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserUncheckedCreateWithoutIdentitiesInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserCreateOrConnectWithoutIdentitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
  }

  export type UserUpsertWithoutIdentitiesInput = {
    update: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutIdentitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type UserUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserUncheckedUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityCreateManyUserInput = {
    id?: string
    provider: string
    providerId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: boolean | null
  }

  export type UserIdentityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}