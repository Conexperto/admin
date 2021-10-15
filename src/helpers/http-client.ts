import type {
  AxiosInstance,
  CancelTokenSource,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import axios from "axios";

type FnInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;
type RejectInterceptor = (error: any) => any;

export type HttpClientResponse<T = any> = AxiosResponse<{
  success: boolean;
  response: T;
  total?: number;
  page?: number;
  limit?: number;
  next?: number;
}>;

export type HttpClientError = AxiosError<{
  success: boolean;
  err: number;
  msg: string;
}>;

export interface HttpClient {
  constructor(endpoint?: string): void;

  isError(err: any): boolean;
  addInterceptor(fn: FnInterceptor, reject?: RejectInterceptor): number;
  removeInteceptor(id: number): void;
  isCancel(): boolean;
  cancel(): void;
  addAuthorization(): HttpClient;
  removeAuthorization(): HttpClient;
  get<T, R = HttpClientResponse<T>>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<R>;
  post<T, R = HttpClientResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T, R = HttpClientResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patch<T, R = HttpClientResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  delete<T, R = HttpClientResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

abstract class StaticHttpClient {
  public static CancelTokenSource(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  public static isCancel(source: CancelTokenSource): boolean {
    return axios.isCancel(source.token);
  }
}

export class HttpClient extends StaticHttpClient implements HttpClient {
  private client: AxiosInstance;
  private cancelToken: CancelTokenSource;
  private authorizationIdInterceptor?: number;

  public constructor(endpoint?: string) {
    super();
    this.cancelToken = axios.CancelToken.source();

    const baseURL = process.env.REACT_APP_API_URL + (endpoint ?? "");
    this.client = axios.create({
      baseURL,
      cancelToken: this.cancelToken.token,
    });
  }

  public isError(err: any): boolean {
    return axios.isAxiosError(err);
  }

  public addInterceptor(fn: FnInterceptor, reject?: RejectInterceptor): number {
    return this.client.interceptors.request.use(fn, reject);
  }

  public removeInteceptor(id: number): void {
    this.client.interceptors.request.eject(id);
  }

  public isCancel(): boolean {
    return axios.isCancel(this.cancelToken.token);
  }

  public cancel(): void {
    return this.cancelToken.cancel();
  }

  public addAuthorization(): HttpClient {
    const token = localStorage.getItem("token");
    const interceptor: FnInterceptor = (
      config: AxiosRequestConfig
    ): AxiosRequestConfig => {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
      };
      return config;
    };

    if (!token) {
      throw new Error("Token not found in ctx or browser.");
    }

    this.authorizationIdInterceptor = this.addInterceptor(interceptor);
    return this;
  }

  public removeAuthorization(): HttpClient {
    if (!this.authorizationIdInterceptor) {
      console.warn("Authorization interceptor not added.");
      return this;
    }
    this.removeInteceptor(this.authorizationIdInterceptor);
    return this;
  }

  public get<T = any, R = HttpClientResponse<T>>(
    url?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.get<T, R>(url ?? "/", config);
  }

  public post<T = any, R = HttpClientResponse<T>>(
    url?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.post<T, R>(url ?? "/", data, config);
  }

  public put<T = any, R = HttpClientResponse<T>>(
    url?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.put<T, R>(url ?? "/", data, config);
  }

  public patch<T = any, R = HttpClientResponse<T>>(
    url?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.patch<T, R>(url ?? "/", data, config);
  }

  public delete<T = any, R = HttpClientResponse<T>>(
    url?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.delete<T, R>(url ?? "/", config);
  }
}
