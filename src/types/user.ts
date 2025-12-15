export type UserRole = "Admin" | "Member" | "Viewer";

export type AccountStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
}
