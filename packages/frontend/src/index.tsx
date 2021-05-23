import 'normalize.css';
import 'xterm/css/xterm.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
