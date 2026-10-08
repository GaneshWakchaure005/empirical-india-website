export type AdminRole = "admin" | "editor";

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminPublic {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: AdminRole;
  name: string;
  iat?: number;
  exp?: number;
}
