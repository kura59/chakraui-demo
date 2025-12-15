import { Button, Table } from "@chakra-ui/react";
import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export const UserTable = ({ users, onEdit }: UserTableProps) => {
  return (
    <Table.Root size="md" variant="outline" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>名前</Table.ColumnHeader>
          <Table.ColumnHeader>メールアドレス</Table.ColumnHeader>
          <Table.ColumnHeader>ロール</Table.ColumnHeader>
          <Table.ColumnHeader>アカウント状態</Table.ColumnHeader>
          <Table.ColumnHeader>操作</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              {user.status === "enabled" ? "有効" : "停止"}
            </Table.Cell>
            <Table.Cell>
              <Button size="sm" variant="outline" onClick={() => onEdit(user)}>
                編集
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
