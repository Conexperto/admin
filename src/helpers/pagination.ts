import type { HttpClient, HttpClientResponse } from "./http-client";

export interface Pagination<T = any, P = { [key: string]: any }> {
  total: number;
  page: number;
  limit: number;
  item: T;
  params: P;
  next(page?: number): Pagination<T, P>;
  prev(page?: number): Pagination<T, P>;
}

export class Pagination<T = any, P = { [key: string]: any }> {
  public total: number;
  public page: number;
  public limit: number;
  public item: T;
  public params: P;

  constructor(private http: HttpClient, public raw: HttpClientResponse<T>) {
    this.total = raw.data?.total ?? 0;
    this.page = raw.data?.page ?? 1;
    this.limit = raw.data?.page ?? 10;
    this.item = raw.data.response;
    this.params = raw.config.params;
  }

  private makeParams(): URLSearchParams {
    return new URLSearchParams({
      page: String(this.page),
      limit: String(this.limit),
      ...this.params,
    });
  }

  private async request(): Promise<void> {
    const { data } = await this.http.get<T>(this.raw.request.url, {
      params: this.makeParams(),
    });
    this.item = data.response;
  }

  private handlerPage(page: number): void {
    if (Math.abs(page * this.limit) > this.total) {
      console.warn("The next page exceed total items.");
      return;
    }
    if (page < 0) {
      console.warn("The prev page is less than zero.");
      return;
    }
    this.page = page;
    this.request();
  }

  public next(page?: number): Pagination<T> {
    this.handlerPage(page ?? this.page++);
    return this;
  }

  public prev(page?: number): Pagination<T> {
    this.handlerPage(page ?? this.page--);
    return this;
  }
}
