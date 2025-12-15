import { useState, useEffect } from "react";
import {
  Drawer,
  Input,
  Select,
  Switch,
  Button,
  Stack,
  Field,
  Box,
  Heading,
} from "@chakra-ui/react";
import type { User, UserFormData, UserRole } from "../types/user";

interface UserFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
  user?: User | null;
}

const initialFormData: UserFormData = {
  name: "",
  email: "",
  role: "Member",
  accountStatus: "active",
};

export function UserFormDrawer({
  isOpen,
  onClose,
  onSave,
  user,
}: UserFormDrawerProps) {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [user, isOpen]);

  const handleSave = () => {
    onSave(formData);
    setFormData(initialFormData);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Drawer.Root isOpen={isOpen} onClose={handleClose} placement="end">
      <Drawer.Backdrop />
      <Drawer.Content>
        <Drawer.Header borderBottomWidth="1px">
          <Heading size="md">{user ? "ユーザー編集" : "新規登録"}</Heading>
        </Drawer.Header>
        <Drawer.Body>
          <Stack gap={6}>
            <Field label="名前" required>
              <Input
                placeholder="名前を入力"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Field>

            <Field label="メールアドレス" required>
              <Input
                type="email"
                placeholder="メールアドレスを入力"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Field>

            <Field label="ロール">
              <Select.Root
                value={[formData.role]}
                onValueChange={(details) =>
                  setFormData({
                    ...formData,
                    role: details.value[0] as UserRole,
                  })
                }
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="Admin">Admin</Select.Item>
                  <Select.Item value="Member">Member</Select.Item>
                  <Select.Item value="Viewer">Viewer</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field>

            <Field label="アカウント状態" display="flex" alignItems="center">
              <Box display="flex" alignItems="center" gap={2}>
                <Switch
                  checked={formData.accountStatus === "active"}
                  onCheckedChange={(details) =>
                    setFormData({
                      ...formData,
                      accountStatus: details.checked ? "active" : "suspended",
                    })
                  }
                />
                <span>
                  {formData.accountStatus === "active" ? "有効" : "停止"}
                </span>
              </Box>
            </Field>
          </Stack>
        </Drawer.Body>

        <Drawer.Footer borderTopWidth="1px">
          <Button variant="outline" onClick={handleClose} mr={3}>
            キャンセル
          </Button>
          <Button colorPalette="blue" onClick={handleSave}>
            保存
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
