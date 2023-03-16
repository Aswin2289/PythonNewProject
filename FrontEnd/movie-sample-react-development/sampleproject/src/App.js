
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import './components/Style.css';
import './App.css';

function App() {
  return (
 <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <About />
      <Footer />
    </Router>
     );
    
}

export default App;

