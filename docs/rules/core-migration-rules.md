## Core Migration Rules

### Package Changes

# Removed Packages

- Remove @emotion/styled and framer-motion dependencies
- Icons: Use lucide-react or react-icons instead of @chakra-ui/icons
- Hooks: Use react-use or usehooks-ts instead of @chakra-ui/hooks
- Next.js: Use asChild prop instead of @chakra-ui/next-js package

### Import Sources

Always use correct import sources:

# From @chakra-ui/react:

Alert, Avatar, Button, Card, Field, Table, Input, NativeSelect, Tabs, Textarea,
Separator, useDisclosure, Box, Flex, Stack, HStack, VStack, Text, Heading, Icon

# From components/ui (relative imports):

Provider, Toaster, ColorModeProvider, Tooltip, PasswordInput
