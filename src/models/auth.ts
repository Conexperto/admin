import { IAdmin } from "./admin";
import type { User } from "firebase/auth";

interface UserRecord extends User {
  claims: { [key: string]: any };
}

export interface Auth {
  uid: string;
  a: UserRecord;
  b?: IAdmin;
  member?: string;
}
