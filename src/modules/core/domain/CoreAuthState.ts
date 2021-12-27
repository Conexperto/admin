import { Nullable } from "src/modules/shared/domain/Nullable";

export interface CoreAuthState<T> {
  user: Nullable<T>;
}

export const initialAuthState = {
  user: null,
};
