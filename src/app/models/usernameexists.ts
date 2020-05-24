export class Usernameexists {
  username: string;
}

export class Usersession {
  username: string;
  sessionID: string;
}

export class UserDetailsResponse {
  p0: UserDetails;
}

export class UserDetails {
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;        
  timeregistered: string;        
}