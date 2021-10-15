export interface Plan {
  id: number;
  duration: number;
  price: number;
  user_id: number;
}

export class Plan implements Plan {
  public id: number;
  public duration: number;
  public price: number;
  public user_id: number;

  constructor(payload: Plan) {
    this.id = payload.id;
    this.duration = payload.duration;
    this.price = payload.price;
    this.user_id = payload.user_id;
  }

  public static fromArray(payload: Plan[]): Plan[] {
    return payload.map((item: Plan) => new Plan(item));
  }
}
