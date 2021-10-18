import { Admin, Privileges } from "./admin";
import type { User } from "firebase/auth";

interface UserRecord extends User {
  claims: { [key: string]: any };
}

export interface IAuth {
  uid: string;
  a: UserRecord;
  b?: Admin;
  member?: string;
}

export class Auth implements IAuth {
  public uid: string;
  public a: UserRecord;
  public b?: Admin;

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

  public get member(): string {
    return Privileges[this.a.claims.access_level];
  }
}
