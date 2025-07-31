import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout';
import ShoeCard from './Components/Shoefile';
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from './Components/Aboutus';
import Ourservices from './Components/Ourservices';
import ContactUs from './Components/Contactus';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import AdminPage from './Components/Admin';
import ProductPage from './pages/Productpage'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setuser } from './Redux/Authslice';
import Cart from './pages/cart';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch=useDispatch();
  const navigate= useNavigate();
   useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser) {
        dispatch(setuser(storedUser));
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error restoring user:', err);
      navigate('/');
    }
  }, [dispatch, navigate]);
  return (
    <>
    <Routes>
      {/* All routes wrapped with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ShoeCard />} />
        <Route path="services" element={<Ourservices />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
        <Route path="admin"  element={<AdminPage/>} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
         

      </Route>
    </Routes>
     <ToastContainer position="top-center" />
     </>
  );
}

export default App;
