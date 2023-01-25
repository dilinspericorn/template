import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import { PrivateRouting } from './PrivateRouting';
import Banner from './Banner';

const App = () => {
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRouting />}>
          <Route path="/" element={<Dashboard />}/>
            <Route path="banner" element={<Banner />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
