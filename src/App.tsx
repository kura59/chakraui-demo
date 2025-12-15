import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { UserManagement } from "./pages/UserManagement";
import "./App.css";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <UserManagement />
    </ChakraProvider>
  );
}

export default App;

