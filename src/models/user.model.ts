export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}
