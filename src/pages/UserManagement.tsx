import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  VStack,
  HStack,
  Heading,
  Container,
} from "@chakra-ui/react";
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
    accountStatus: "active",
  },
  {
    id: "2",
    name: "鈴木花子",
    email: "suzuki@example.com",
    role: "Member",
    accountStatus: "active",
  },
  {
    id: "3",
    name: "佐藤次郎",
    email: "sato@example.com",
    role: "Viewer",
    accountStatus: "suspended",
  },
  {
    id: "4",
    name: "田中美咲",
    email: "tanaka@example.com",
    role: "Member",
    accountStatus: "active",
  },
  {
    id: "5",
    name: "高橋健太",
    email: "takahashi@example.com",
    role: "Admin",
    accountStatus: "active",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 検索フィルター
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

  const handleOpenDrawer = () => {
    setSelectedUser(null);
    setIsDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleSaveUser = (formData: UserFormData) => {
    if (selectedUser) {
      // 編集
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...selectedUser, ...formData } : u
        )
      );
    } else {
      // 新規登録
      const newUser: User = {
        id: String(Date.now()),
        ...formData,
      };
      setUsers([...users, newUser]);
    }
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* ページタイトル */}
        <Heading as="h1" size="lg">
          ユーザー
        </Heading>

        {/* 検索バーと新規登録ボタン */}
        <HStack gap={4} justify="space-between" flexWrap="wrap">
          <InputGroup maxW="sm">
            <Input
              placeholder="名前またはメールアドレスで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            colorPalette="blue"
            onClick={handleOpenDrawer}
            whiteSpace="nowrap"
          >
            新規登録
          </Button>
        </HStack>

        {/* ユーザーテーブル */}
        <Box borderWidth="1px" borderRadius="md" overflow="hidden">
          <UserTable users={filteredUsers} onEditClick={handleEditUser} />
        </Box>
      </VStack>

      {/* フォームDrawer */}
      <UserFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </Container>
  );
}
