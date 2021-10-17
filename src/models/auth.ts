import { Admin } from "./admin";
import type { User as UserRecord } from "firebase/auth";

export interface IAuth {
  uid: string;
  a: UserRecord;
  b?: Admin;
  claims?: { [key: string]: any };
}

export class Auth implements IAuth {
  public uid: string;
  public a: UserRecord;
  public b?: Admin;
  public claims?: { [key: string]: any };

  constructor(payload: IAuth) {
    this.uid = payload.uid;
    this.a = payload.a;
    this.b = payload.b;
  }

  public get auth(): UserRecord {
    return this.a;
  }

  public get user(): Admin | undefined {
    return this.b;
  }
}
