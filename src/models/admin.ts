const Privileges: { [key: number]: string } = {
  0: "Usuario SuperRoot",
  1: "Usuario Root",
  2: "Administrador",
  3: "Usuario",
};

export interface Admin {
  id: number;
  uid: string;
  display_name: string;
  email: string;
  phone_number: string;
  photo_url: string;
  name: string;
  lastname: string;
  disabled: boolean;
  privileges: number;
}

export class Admin implements Admin {
  public id: number;
  public uid: string;
  public display_name: string;
  public email: string;
  public phone_number: string;
  public photo_url: string;
  public name: string;
  public lastname: string;
  public disabled: boolean;
  public privileges: number;

  constructor(payload: Admin) {
    this.id = payload.id;
    this.uid = payload.uid;
    this.display_name = payload.display_name;
    this.email = payload.email;
    this.phone_number = payload.phone_number;
    this.photo_url = payload.photo_url;
    this.name = payload.name;
    this.lastname = payload.lastname;
    this.disabled = payload.disabled;
    this.privileges = payload.privileges;
  }

  public get member(): string {
    return Privileges[this.privileges];
  }
}
