import { ChakraProvider } from "@chakra-ui/react";
import { UserManagement } from "./pages/UserManagement";

function App() {
  return (
    <ChakraProvider>
      <UserManagement />
    </ChakraProvider>
  );
}

export default App;

