export interface Speciality {
  id: number;
  name: string;
  disabled: boolean;
}

export class Speciality implements Speciality {
  public id: number;
  public name: string;
  public disabled: boolean;

  constructor(payload: Speciality) {
    this.id = payload.id;
    this.name = payload.name;
    this.disabled = payload.disabled;
  }

  public static fromArray(payload: Speciality[]) {
    return payload.map((item: Speciality) => new Speciality(item));
  }
}
