import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './config/reactotron';
import GlobalStyle from './styles/global';

import Sidebar from './Components/Sidebar';
import Player from './Components/Player';
import Header from './Components/Header';

import { Wrapper, Container, Content } from './styles/components';

import Routes from './routes';
import store from './store';
import ErrorBox from './Components/ErrorBox';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Wrapper>
          <Container>
            <Sidebar />
            <Content>
              <ErrorBox />
              <Header />
              <Routes />
            </Content>
          </Container>
          <Player />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
