export interface User {
  email: string;
  password: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}
