import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import Main from './components/Main';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Main />
      </div>
    </ChakraProvider>
  );
}

export default App;
