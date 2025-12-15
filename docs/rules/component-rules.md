### Toast System

```tsx
// ✅ New v3 way
import { toaster } from "./components/ui/toaster";

// ❌ Old v2 way
const toast = useToast();
toast({
  title: "Title",
  status: "error",
  isClosable: true,
  position: "top-right",
});

toaster.create({
  title: "Title",
  type: "error", // status → type
  meta: {
    closable: true, // isClosable → meta.closable
  },
  placement: "top-end", // top-right → top-end
});
```

### Dialog (formerly Modal)

```tsx
// ❌ Old v2
<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalBody>Content</ModalBody>
  </ModalContent>
</Modal>

// ✅ New v3
<Dialog.Root open={isOpen} onOpenChange={onOpenChange} placement="center">
  <Dialog.Backdrop />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Title</Dialog.Title>
    </Dialog.Header>
    <Dialog.Body>Content</Dialog.Body>
  </Dialog.Content>
</Dialog.Root>
```

### Button Icons

```tsx
// ❌ Old v2
<Button leftIcon={<Mail />} rightIcon={<ChevronRight />}>
  Email
</Button>

// ✅ New v3
<Button>
  <Mail /> Email <ChevronRight />
</Button>
```

### Alert Structure

```tsx
// ❌ Old v2
<Alert variant="left-accent">
  <AlertIcon />
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>

// ✅ New v3
<Alert.Root borderStartWidth="4px" borderStartColor="colorPalette.solid">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Title</Alert.Title>
    <Alert.Description>Description</Alert.Description>
  </Alert.Content>
</Alert.Root>
```

### Tooltip

```tsx
// ❌ Old v2
<Tooltip label="Content" hasArrow placement="top">
  <Button>Hover me</Button>
</Tooltip>;

// ✅ New v3
import { Tooltip } from "./components/ui/tooltip";

<Tooltip content="Content" showArrow positioning={{ placement: "top" }}>
  <Button>Hover me</Button>
</Tooltip>;
```

### Input with Validation

```tsx
// ❌ Old v2
<Input isInvalid />

// ✅ New v3
<Field.Root invalid>
  <Field.Label>Email</Field.Label>
  <Input />
  <Field.ErrorText>This field is required</Field.ErrorText>
</Field.Root>
```

### Table Structure

```tsx
// ❌ Old v2
<Table variant="simple">
  <Thead>
    <Tr>
      <Th>Header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Cell</Td>
    </Tr>
  </Tbody>
</Table>

// ✅ New v3
<Table.Root variant="line">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Header</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Cell</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Tabs

```tsx
// ❌ Old v2
<Tabs>
  <TabList>
    <Tab>One</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content</TabPanel>
  </TabPanels>
</Tabs>

// ✅ New v3
<Tabs.Root defaultValue="one" colorPalette="orange">
  <Tabs.List>
    <Tabs.Trigger value="one">One</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">Content</Tabs.Content>
</Tabs.Root>
```

### Menu

```tsx
// ❌ Old v2
<Menu>
  <MenuButton as={Button}>Actions</MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
  </MenuList>
</Menu>

// ✅ New v3
<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item value="download">Download</Menu.Item>
  </Menu.Content>
</Menu.Root>
```

### Popover

```tsx
// ❌ Old v2
<Popover>
  <PopoverTrigger>
    <Button>Click</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>

// ✅ New v3
<Popover.Root positioning={{ placement: "bottom-end" }}>
  <Popover.Trigger asChild>
    <Button>Click</Button>
  </Popover.Trigger>
  <Popover.Content>
    <PopoverArrow />
    <Popover.Body>Content</Popover.Body>
  </Popover.Content>
</Popover.Root>
```

### Select/NativeSelect

```tsx
// ❌ Old v2
<Select placeholder="Select option">
  <option value="1">Option 1</option>
</Select>

// ✅ New v3
<NativeSelect.Root size="sm">
  <NativeSelect.Field placeholder="Select option">
    <option value="1">Option 1</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator />
</NativeSelect.Root>
```
