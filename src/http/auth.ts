import { HttpClient } from "helpers";
import type { Auth } from "models";

export interface HttpAuth {
  currentUser(): Promise<Auth>;
  update(payload: Auth): Promise<Auth>;
  disabled(): Promise<Auth>;
}

const endpoint = "/admin/auth";
export class HttpAuth extends HttpClient implements HttpAuth {
  constructor() {
    super(endpoint);
    this.addAuthorization();
  }

  public async currentUser(): Promise<Auth> {
    try {
      const { data } = await this.get<Auth>();
      return data.response;
    } catch (err) {
      throw err;
    }
  }

  public async update(payload: Partial<Auth>): Promise<Auth> {
    try {
      const { data } = await this.put<Auth>("/", payload);
      return data.response;
    } catch (err) {
      throw err;
    }
  }

  public async disabled(): Promise<Auth> {
    try {
      const { data } = await this.patch<Auth>("/disabled");
      return data.response;
    } catch (err) {
      throw err;
    }
  }
}
