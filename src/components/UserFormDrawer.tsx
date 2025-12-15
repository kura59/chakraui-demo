import { useState } from "react";
import {
  Button,
  Drawer,
  Field,
  Input,
  Portal,
  Select,
  Stack,
  Switch,
  createListCollection,
} from "@chakra-ui/react";
import type { User, UserFormData, UserRole } from "../types/user";

const roleOptions = createListCollection({
  items: [
    { label: "Admin", value: "Admin" },
    { label: "Member", value: "Member" },
    { label: "Viewer", value: "Viewer" },
  ],
});

interface UserFormDrawerProps {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  user: User | null;
  onSave: (formData: UserFormData) => void;
}

export const UserFormDrawer = ({
  open,
  onOpenChange,
  user,
  onSave,
}: UserFormDrawerProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Member",
    status: user?.status === "enabled" || true,
  });

  const handleSave = () => {
    onSave(formData);
    setFormData({
      name: "",
      email: "",
      role: "Member",
      status: true,
    });
    onOpenChange({ open: false });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      role: "Member",
      status: true,
    });
    onOpenChange({ open: false });
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                {user ? "ユーザー編集" : "新規ユーザー登録"}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>名前</Field.Label>
                  <Input
                    placeholder="名前を入力"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>メールアドレス</Field.Label>
                  <Input
                    type="email"
                    placeholder="メールアドレスを入力"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>ロール</Field.Label>
                  <Select.Root
                    collection={roleOptions}
                    value={[formData.role]}
                    onValueChange={(details) => {
                      const role = details.value[0] as UserRole;
                      setFormData({ ...formData, role });
                    }}
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
                          {roleOptions.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                              {item.label}
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
                    checked={formData.status}
                    onCheckedChange={(details) =>
                      setFormData({ ...formData, status: details.checked })
                    }
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>
                      {formData.status ? "有効" : "停止"}
                    </Switch.Label>
                  </Switch.Root>
                </Field.Root>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer gap="2">
              <Button variant="outline" onClick={handleCancel}>
                キャンセル
              </Button>
              <Button onClick={handleSave}>保存</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button
                position="absolute"
                top="2"
                insetEnd="2"
                size="sm"
                variant="ghost"
              >
                ✕
              </Button>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
