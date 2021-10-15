import { Admin } from "./admin";
import type { User as UserRecord } from "firebase/auth";

export interface Auth {
  uid: string;
  a: UserRecord;
  b: Admin;
}

export class Auth implements Auth {
  public uid: string;
  public a: UserRecord;
  public b: Admin;

  constructor(payload: Auth) {
    this.uid = payload.uid;
    this.a = payload.a;
    this.b = payload.b;
  }

  public get auth() {
    return this.a;
  }

  public get user() {
    return this.b;
  }
}
