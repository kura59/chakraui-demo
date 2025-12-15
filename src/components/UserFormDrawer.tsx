import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import type { User, UserRole } from "../types/user";

interface UserFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialUser?: User;
  onSave: (user: User) => void;
}

export const UserFormDrawer = ({
  isOpen,
  onClose,
  initialUser,
  onSave,
}: UserFormDrawerProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Member");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialUser) {
      setName(initialUser.name);
      setEmail(initialUser.email);
      setRole(initialUser.role);
      setIsActive(initialUser.accountStatus === "active");
    } else {
      setName("");
      setEmail("");
      setRole("Member");
      setIsActive(true);
    }
  }, [initialUser, isOpen]);

  const handleSave = () => {
    const newUser: User = {
      id: initialUser?.id || Date.now().toString(),
      name,
      email,
      role,
      accountStatus: isActive ? "active" : "inactive",
    };
    onSave(newUser);
    onClose();
  };

  const isFormValid = name.trim() !== "" && email.trim() !== "";

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {initialUser ? "ユーザーを編集" : "新規ユーザーを登録"}
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>名前</FormLabel>
              <Input
                placeholder="名前を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type="email"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>ロール</FormLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
                <option value="Viewer">Viewer</option>
              </Select>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0} flex={1}>
                アカウント状態
              </FormLabel>
              <Switch
                isChecked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span style={{ marginLeft: "8px" }}>
                {isActive ? "有効" : "停止"}
              </span>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            キャンセル
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isDisabled={!isFormValid}
          >
            保存
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
