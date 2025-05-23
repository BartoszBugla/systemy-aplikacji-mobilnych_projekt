/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum TransactionCategory {
  Food = "food",
  Transport = "transport",
  Salary = "salary",
}

export enum TransactionType {
  Income = "income",
  Expense = "expense",
}

export enum TransactionCurrency {
  USD = "USD",
  EUR = "EUR",
}

export interface CreateTransactionDto {
  amount: number;
  currency: TransactionCurrency;
  type: TransactionType;
  description: string;
  category: TransactionCategory;
  accountReceiver?: string;
  secondUserEmail?: string;
}

export interface TransactionResponse {
  _id: string;
  amount: number;
  currency: TransactionCurrency;
  type: string;
  description: string;
  category: string;
  accountReceiver: string;
  accountSender: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  secondAccountEmail: string;
  __v: number;
}

export interface TransactionListResponse {
  data: TransactionResponse[];
}

export interface GetMeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UsersResponse {
  data: UserResponse[];
}

export interface NotificationResponse {
  id: string;
  title: string;
  message: string | null;
  userId: string;
  /** @format date-time */
  seenAt: string | null;
  seen: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface NotificationListResponse {
  data: NotificationResponse[];
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  seen: boolean;
  userId: string;
}

export interface UpdateNotificationDto {
  seen?: boolean;
}

export interface RegisterSubscriptionsDto {
  subscription: object;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface RegisterResponse {
  accessToken: string;
}

export interface TotalAmountResponse {
  totalAmount: number;
  currency: string;
}

export interface TransactionGraphItem {
  /** @format date-time */
  date: string;
  amount: number;
  currency: string;
  type: TransactionType;
}

export interface TransactionGraphResponse {
  data: TransactionGraphItem[];
}

export interface SpendResponse {
  spend: number;
  target: number;
  currency: TransactionCurrency;
}

export interface NewSpendLimitDto {
  limit: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title Aplikacja do zarządzania finansami
 * @version 1.0
 * @contact
 *
 * Dokumentacja API
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Transaction
     * @name TransactionControllerCreate
     * @request POST:/api/transaction
     * @secure
     */
    transactionControllerCreate: (
      data: CreateTransactionDto,
      params: RequestParams = {},
    ) =>
      this.request<TransactionResponse, void>({
        path: `/api/transaction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transaction
     * @name TransactionControllerFindAll
     * @request GET:/api/transaction
     * @secure
     */
    transactionControllerFindAll: (params: RequestParams = {}) =>
      this.request<TransactionListResponse, void>({
        path: `/api/transaction`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMe
     * @request GET:/api/user/me
     * @secure
     */
    userControllerGetMe: (params: RequestParams = {}) =>
      this.request<GetMeResponse, void>({
        path: `/api/user/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetUsers
     * @request GET:/api/user/users
     * @secure
     */
    userControllerGetUsers: (params: RequestParams = {}) =>
      this.request<UsersResponse, void>({
        path: `/api/user/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notification
     * @name NotificationControllerGetNotifications
     * @request GET:/api/notification
     * @secure
     */
    notificationControllerGetNotifications: (params: RequestParams = {}) =>
      this.request<NotificationListResponse, void>({
        path: `/api/notification`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notification
     * @name NotificationControllerCreate
     * @request POST:/api/notification
     * @secure
     */
    notificationControllerCreate: (
      data: CreateNotificationDto,
      params: RequestParams = {},
    ) =>
      this.request<NotificationResponse, void>({
        path: `/api/notification`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notification
     * @name NotificationControllerUpdate
     * @request PATCH:/api/notification/{id}
     * @secure
     */
    notificationControllerUpdate: (
      id: string,
      data: UpdateNotificationDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/notification/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PushMessage
     * @name PushMessageControllerRegister
     * @request POST:/api/push-message/register
     * @secure
     */
    pushMessageControllerRegister: (
      data: RegisterSubscriptionsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/push-message/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<LoginResponse, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/api/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<RegisterResponse, any>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Widget
     * @name WidgetControllerTotalAmount
     * @request GET:/api/total-amount
     * @secure
     */
    widgetControllerTotalAmount: (params: RequestParams = {}) =>
      this.request<TotalAmountResponse, void>({
        path: `/api/total-amount`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Widget
     * @name WidgetControllerTransactionGraph
     * @request GET:/api/transaction-graph
     * @secure
     */
    widgetControllerTransactionGraph: (
      query: {
        /** @format date-time */
        from: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TransactionGraphResponse, void>({
        path: `/api/transaction-graph`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Widget
     * @name WidgetControllerSpend
     * @request GET:/api/spend
     * @secure
     */
    widgetControllerSpend: (params: RequestParams = {}) =>
      this.request<SpendResponse, void>({
        path: `/api/spend`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Widget
     * @name WidgetControllerSetSpendLimit
     * @request PUT:/api/spend
     * @secure
     */
    widgetControllerSetSpendLimit: (
      data: NewSpendLimitDto,
      params: RequestParams = {},
    ) =>
      this.request<GetMeResponse, void>({
        path: `/api/spend`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
