import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/Store.js';
import { Provider } from 'react-redux';
import { CartProvider } from './Context/cartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>

      <CartProvider>
        <App />
      </CartProvider>  
       
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
