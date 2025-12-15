export type UserRole = "Admin" | "Member" | "Viewer";

export type AccountStatus = "active" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
}
