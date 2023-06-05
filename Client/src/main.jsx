import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { AuthProvider } from './context/auth'
import { SearchProvider } from './context/search'
import { CartProvider } from "./context/cart";
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
)
