import { Table, Button, Badge, Box } from "@chakra-ui/react";
import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  onEditClick: (user: User) => void;
}

const roleColors: Record<string, string> = {
  Admin: "red",
  Member: "blue",
  Viewer: "gray",
};

const statusColors: Record<string, string> = {
  active: "green",
  suspended: "orange",
};

const statusLabels: Record<string, string> = {
  active: "有効",
  suspended: "停止",
};

export function UserTable({ users, onEditClick }: UserTableProps) {
  return (
    <Box overflowX="auto">
      <Table.Root striped size="sm">
        <Table.Header bg="bg.subtle">
          <Table.Row>
            <Table.ColumnHeaderCell>名前</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>メールアドレス</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ロール</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>アカウント状態</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell textAlign="center">
              操作
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={roleColors[user.role]}>{user.role}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge colorPalette={statusColors[user.accountStatus]}>
                  {statusLabels[user.accountStatus]}
                </Badge>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditClick(user)}
                >
                  編集
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
