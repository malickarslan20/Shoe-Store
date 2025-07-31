import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './Logout';
import authService from '../Appwrite/auth';
import { useCart } from '../Context/cartContext'; // ✅ Cart context

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { cartItems } = useCart(); // ✅ get cart items

  const navLinks=useMemo(()=>{
   
    if(user?.email=== "arslan1@gmail.com")
    {
       return [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Services' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/admin', label: 'Admin' },
  ];

    }
    else{
      return [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Services' },
    { path: '/contact', label: 'Contact Us' },
   
  ];

    }
  },[user])


 const CartButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink to="/cart">
        <button className="flex items-center gap-2 bg-white border border-red-500 text-red-500 py-2 px-4 rounded-[1px] relative">
          <ShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cartItems.length}
            </span>
          )}
        </button>
      </NavLink>

      {/* Mini Cart Dropdown */}
      {isHovered && cartItems.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 space-y-3">
          <h3 className="text-lg font-semibold border-b pb-2">🛍️ Cart Preview</h3>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={item.imageId} alt={item.title} className="w-12 h-12 object-contain rounded" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-green-600">Rs: {item.Price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold">
              Total: Rs {cartItems.reduce((sum, item) => sum + Number(item.Price), 0)}
            </span>
            <NavLink to="/cart">
              <button className="text-sm text-red-500 hover:underline">Go to Cart</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <img src="/ShoeImage/logo.png" alt="Logo" className="h-16 w-24" />

        {/* Center Nav Links (Desktop) */}
        <ul className="hidden md:flex items-center justify-center space-x-6 text-gray-700 font-medium flex-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? 'text-red-600 underline' : 'hover:text-red-500'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <CartButton />
              <NavLink to="/logout">
                <button className="bg-transparent px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition">
                  Logout
                </button>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login">
              <button className="bg-transparent px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition">
                Login
              </button>
            </NavLink>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-500"
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <CartButton />
              <NavLink to="/logout">
                <button className="bg-transparent px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition">
                  Logout
                </button>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login">
              <button className="bg-transparent px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition">
                Login
              </button>
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Nav;
