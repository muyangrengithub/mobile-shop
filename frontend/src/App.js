import React, {Suspense} from 'react';
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import routes from './router'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'

import store from './redux/store.js'
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Header />
        <Suspense fallback={<div>page loading</div>}>
        <main className='py-3'>
          <Container>
            {renderRoutes(routes)}
          </Container>
        </main>
        </Suspense>
        <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
