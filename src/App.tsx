import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { UserManagement } from "./pages/UserManagement";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <UserManagement />
    </ChakraProvider>
  );
}

export default App;

