export type UserRole = "Admin" | "Member" | "Viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "enabled" | "disabled";
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: boolean;
}
