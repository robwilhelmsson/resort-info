// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Resorts from './pages/Resorts';
import ResortInfo from './pages/ResortInfo';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response =  await axios.get('http://127.0.0.1:4000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { data } = response
        setUser(data[0]);
      } catch (error) {
        setUser(null)
        console.log('Failed to fetch user', error);
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <UserProvider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/resort/:name" element={<ResortInfo />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signin" element={<SignIn fetchUser={fetchUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
