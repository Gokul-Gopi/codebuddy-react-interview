import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import worker from './mocks/browser';

worker.start();

const theme = extendTheme({
  colors: {
    primary: {
      bg: '#051f27',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
