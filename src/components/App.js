// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from "./Login.js";
import UserSpace from "./UserSpace";
import Signup from "./Signup";
import Footer from './Footer';
import Availability from './Availability';
import ReservationCourse from "./ReservationCourse";
import ParentCourses from "./ParentCourses";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  


  return (
    <Router>
      <CssBaseline />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            exact
            path="/mon-compte"
            element={<Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />}
          />
          {isAuthenticated && (
            <Route
              exact
              path="/profile"
              element={<UserSpace user={user} />}
            />
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/mes-disponibilites" element={<Availability user={user} />} />
          <Route path="/reservation-course" element={<ReservationCourse user={user}/>} />
          <Route path="/my-courses" element={<ParentCourses user={user}/>} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
