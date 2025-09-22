import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext.jsx'
import WishListContext from './context/WishListContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContext>
          <WishListContext>
            <App />
          </WishListContext>
        </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)