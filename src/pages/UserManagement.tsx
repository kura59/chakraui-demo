import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import type { User } from "../types/user";
import { UserTable } from "../components/UserTable";
import { UserFormDrawer } from "../components/UserFormDrawer";

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
    accountStatus: "inactive",
  },
  {
    id: "4",
    name: "高橋美咲",
    email: "takahashi@example.com",
    role: "Member",
    accountStatus: "active",
  },
  {
    id: "5",
    name: "田中健太",
    email: "tanaka@example.com",
    role: "Admin",
    accountStatus: "active",
  },
];

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 検索フィルター
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const handleNewUser = () => {
    setSelectedUser(undefined);
    onOpen();
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleSaveUser = (user: User) => {
    setUsers((prevUsers) => {
      const index = prevUsers.findIndex((u) => u.id === user.id);
      if (index >= 0) {
        // 既存ユーザーを更新
        const newUsers = [...prevUsers];
        newUsers[index] = user;
        return newUsers;
      } else {
        // 新規ユーザーを追加
        return [...prevUsers, user];
      }
    });
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* ページタイトル */}
        <Heading as="h1" size="lg">
          ユーザー
        </Heading>

        {/* 検索欄と新規登録ボタン */}
        <HStack spacing={4}>
          <InputGroup flex={1} maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="名前またはメールで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button colorScheme="blue" onClick={handleNewUser}>
            新規登録
          </Button>
        </HStack>

        {/* ユーザーテーブル */}
        <Box overflowX="auto" borderWidth={1} borderRadius="md">
          <UserTable users={filteredUsers} onEditClick={handleEditUser} />
        </Box>
      </VStack>

      {/* ユーザー登録・編集Drawer */}
      <UserFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        initialUser={selectedUser}
        onSave={handleSaveUser}
      />
    </Box>
  );
};
