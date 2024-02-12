export interface User {
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}
