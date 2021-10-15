export interface Method {
  id: number;
  name: string;
  disabled: boolean;
}

export class Method implements Method {
  public id: number;
  public name: string;
  public disabled: boolean;

  constructor(payload: Method) {
    this.id = payload.id;
    this.name = payload.name;
    this.disabled = payload.disabled;
  }

  public static fromArray(payload: Method[]): Method[] {
    return payload.map((item: Method) => new Method(item));
  }
}
