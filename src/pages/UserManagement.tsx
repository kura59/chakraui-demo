import { useState, useMemo } from "react";
import { Box, Button, Heading, Input, Stack, VStack } from "@chakra-ui/react";
import { UserTable } from "../components/UserTable";
import { UserFormDrawer } from "../components/UserFormDrawer";
import type { User, UserFormData } from "../types/user";

// ダミーデータ
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "山田太郎",
    email: "yamada@example.com",
    role: "Admin",
    status: "enabled",
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "sato@example.com",
    role: "Member",
    status: "enabled",
  },
  {
    id: "3",
    name: "鈴木次郎",
    email: "suzuki@example.com",
    role: "Viewer",
    status: "disabled",
  },
  {
    id: "4",
    name: "田中美咲",
    email: "tanaka@example.com",
    role: "Member",
    status: "enabled",
  },
];

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 検索フィルタリング
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleNewUser = () => {
    setSelectedUser(null);
    setDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleSaveUser = (formData: UserFormData) => {
    if (selectedUser) {
      // 編集
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status ? "enabled" : "disabled",
              }
            : user
        )
      );
    } else {
      // 新規追加
      const newUser: User = {
        id: String(users.length + 1),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status ? "enabled" : "disabled",
      };
      setUsers([...users, newUser]);
    }
  };

  return (
    <Box p="6">
      <VStack gap="6" align="stretch">
        {/* ページタイトル */}
        <Heading as="h1" size="lg">
          ユーザー
        </Heading>

        {/* 検索と新規登録ボタン */}
        <Stack direction="row" gap="4" align="center">
          <Input
            placeholder="名前またはメールアドレスで検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            flex="1"
            maxW="300px"
          />
          <Button onClick={handleNewUser} colorPalette="blue">
            新規登録
          </Button>
        </Stack>

        {/* ユーザーテーブル */}
        <UserTable users={filteredUsers} onEdit={handleEditUser} />
      </VStack>

      {/* ユーザーフォームDrawer */}
      <UserFormDrawer
        open={drawerOpen}
        onOpenChange={(details) => setDrawerOpen(details.open)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </Box>
  );
};
