import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './AserverAuth/auth';
import { setLoginStatus, setUserData, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(setLoginStatus(true)); // Assuming `setLoginStatus` expects a boolean
          dispatch(setUserData(userData)); // Pass user data directly
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setError(error.message || "Failed to load user data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <main className="flex flex-grow flex-col  ">
        {loading ? (
          <p className="text-blue-600 text-lg animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-600 bg-red-100 p-2 rounded-lg">
            Error: {error}
          </p>
        ) : (
          <Outlet /> // Render child routes here
        )}
      </main>
      
    </div>
  );
}

export default App;
