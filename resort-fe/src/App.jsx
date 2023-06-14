import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Resorts from './pages/Resorts';
import ResortInfo from './pages/ResortInfo';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      }
    }
  }, []);
  console.log(user)
  return (
    <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/resorts" element={<Resorts user={user} />} />
          <Route path="/resort/:name" element={<ResortInfo />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  );
};

export default App;
