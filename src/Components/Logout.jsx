// src/Pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearuser } from '../Redux/Authslice';
import authService from '../Appwrite/auth';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch

  useEffect(() => {
    const performLogout = async () => {
      try {
        await authService.logout(); // Appwrite logout
        dispatch(clearuser()); // Clear user from Redux
        localStorage.removeItem('user'); // Optional: clear localStorage
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return <p className="text-center mt-10">Logging out...</p>;
};

export default Logout;
