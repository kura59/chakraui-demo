import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
} from "@chakra-ui/react";
import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  onEditClick: (user: User) => void;
}

export const UserTable = ({ users, onEditClick }: UserTableProps) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "red";
      case "Member":
        return "blue";
      case "Viewer":
        return "gray";
      default:
        return "gray";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active" ? "green" : "gray";
  };

  const getStatusText = (status: string) => {
    return status === "active" ? "有効" : "停止";
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>名前</Th>
          <Th>メールアドレス</Th>
          <Th>ロール</Th>
          <Th>アカウント状態</Th>
          <Th>操作</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <Badge colorScheme={getRoleBadgeColor(user.role)}>
                {user.role}
              </Badge>
            </Td>
            <Td>
              <Badge colorScheme={getStatusBadgeColor(user.accountStatus)}>
                {getStatusText(user.accountStatus)}
              </Badge>
            </Td>
            <Td>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => onEditClick(user)}
              >
                編集
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
