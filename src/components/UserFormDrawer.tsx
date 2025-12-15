import { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Input,
  Field,
  Select,
  Switch,
  Stack,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import type { User, UserRole, UserFormData } from "../types/user";

interface UserFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  onSave: (data: UserFormData, userId?: string) => void;
}

const roleCollection = createListCollection({
  items: [
    { label: "Admin", value: "Admin" },
    { label: "Member", value: "Member" },
    { label: "Viewer", value: "Viewer" },
  ],
});

export const UserFormDrawer = ({
  isOpen,
  onClose,
  user,
  onSave,
}: UserFormDrawerProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "Member",
    isActive: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Member",
        isActive: true,
      });
    }
  }, [user, isOpen]);

  const handleSave = () => {
    onSave(formData, user?.id);
    onClose();
  };

  const title = user ? "ユーザーを編集" : "新規登録";

  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap="4">
                <Field.Root required>
                  <Field.Label>名前</Field.Label>
                  <Input
                    placeholder="ユーザー名を入力"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>メールアドレス</Field.Label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>ロール</Field.Label>
                  <Select.Root
                    collection={roleCollection}
                    value={[formData.role]}
                    onValueChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.value[0] as UserRole,
                      })
                    }
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="ロールを選択" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {roleCollection.items.map((role) => (
                            <Select.Item item={role} key={role.value}>
                              {role.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>アカウント状態</Field.Label>
                  <Switch.Root
                    checked={formData.isActive}
                    onCheckedChange={(e) =>
                      setFormData({
                        ...formData,
                        isActive: e.checked,
                      })
                    }
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>
                      {formData.isActive ? "有効" : "停止"}
                    </Switch.Label>
                  </Switch.Root>
                </Field.Root>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={onClose}>
                キャンセル
              </Button>
              <Button colorPalette="blue" onClick={handleSave}>
                保存
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
