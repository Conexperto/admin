import { Plan } from "./plan";
import { Speciality } from "./speciality";
import { Method } from "./method";

export interface User {
  id: string;
  uid: string;
  display_name: string;
  email: string;
  phone_number: string;
  photo_url: string;
  name: string;
  lastname: string;
  disabled: boolean;
  rating_average: number;
  rating_stars: number[];
  rating_votes: number;
  headline: string;
  about_me: string;
  session_taken: number;
  complete_register: boolean;
  timezone: string;
  link_video: string;
  location: string;
  plans: Plan[];
  specialities: Speciality[];
  methods: Method[];
}

export class User implements User {
  public id: string;
  public uid: string;
  public display_name: string;
  public email: string;
  public phone_number: string;
  public photo_url: string;
  public name: string;
  public lastname: string;
  public disabled: boolean;
  public rating_average: number;
  public rating_stars: number[];
  public rating_votes: number;
  public headline: string;
  public about_me: string;
  public session_taken: number;
  public complete_register: boolean;
  public timezone: string;
  public link_video: string;
  public location: string;
  public plans: Plan[];
  public specialities: Speciality[];
  public methods: Method[];

  constructor(payload: User) {
    this.id = payload.id;
    this.uid = payload.uid;
    this.display_name = payload.display_name;
    this.email = payload.email;
    this.phone_number = payload.phone_number;
    this.photo_url = payload.photo_url;
    this.name = payload.name;
    this.lastname = payload.lastname;
    this.disabled = payload.disabled;
    this.rating_average = payload.rating_average;
    this.rating_stars = payload.rating_stars;
    this.rating_votes = payload.rating_votes;
    this.headline = payload.headline;
    this.about_me = payload.about_me;
    this.session_taken = payload.session_taken;
    this.complete_register = payload.complete_register;
    this.timezone = payload.timezone;
    this.link_video = payload.timezone;
    this.location = payload.location;
    this.plans = Plan.fromArray(payload.plans);
    this.specialities = Speciality.fromArray(payload.specialities);
    this.methods = Method.fromArray(payload.methods);
  }

  public static fromArray(payload: User[]) {
    return payload.map((item: User) => new User(item));
  }
}
