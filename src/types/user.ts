export type UserRole = "Admin" | "Member" | "Viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
