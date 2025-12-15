import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Input,
  InputGroup,
  Stack,
  HStack,
} from "@chakra-ui/react";
import type { User, UserFormData } from "../types/user";
import { UserTable } from "../components/UserTable";
import { UserFormDrawer } from "../components/UserFormDrawer";

// ダミーデータ
const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "Admin",
    isActive: true,
  },
  {
    id: "2",
    name: "山田花子",
    email: "yamada@example.com",
    role: "Member",
    isActive: true,
  },
  {
    id: "3",
    name: "佐藤次郎",
    email: "sato@example.com",
    role: "Viewer",
    isActive: false,
  },
  {
    id: "4",
    name: "鈴木美咲",
    email: "suzuki@example.com",
    role: "Member",
    isActive: true,
  },
];

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // 検索フィルタリング
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewUser = () => {
    setEditingUser(null);
    setIsDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDrawerOpen(true);
  };

  const handleSaveUser = (data: UserFormData, userId?: string) => {
    if (userId) {
      // 既存ユーザーの更新
      setUsers(
        users.map((u) =>
          u.id === userId
            ? {
                ...u,
                ...data,
              }
            : u
        )
      );
    } else {
      // 新規ユーザーの追加
      const newUser: User = {
        id: String(users.length + 1),
        ...data,
      };
      setUsers([...users, newUser]);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingUser(null);
  };

  return (
    <Box p="8">
      <Stack gap="6">
        {/* ページタイトル */}
        <Heading as="h1" size="xl">
          ユーザー
        </Heading>

        {/* 検索とボタンセクション */}
        <HStack gap="4" wrap="wrap">
          <InputGroup flex="1" maxW="400px">
            <Input
              placeholder="名前またはメールアドレスで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button colorPalette="blue" onClick={handleNewUser}>
            新規登録
          </Button>
        </HStack>

        {/* ユーザー一覧テーブル */}
        <UserTable users={filteredUsers} onEdit={handleEditUser} />
      </Stack>

      {/* ユーザーフォーム Drawer */}
      <UserFormDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </Box>
  );
};
