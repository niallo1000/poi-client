export interface Comment {
  firstName: string;
  lastName: string;
  office: string;
  _id : string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Poi {
  name: string;
  description: string;
  catagory: string;
  comment: Comment;
  location: Location;


}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}
