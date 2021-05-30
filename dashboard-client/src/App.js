import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from "@chakra-ui/react"
//import HomePage from './components/HomePage';
import Main from './components/Main';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
