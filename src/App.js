import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import Login from './Login';
import Register from './components/Register';
import ProjectList from './components/ProjectList';
import EditProject from './components/EditProject';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/projectlist"  element={<ProjectList />} />
        <Route path="/edit/:projectId"  element={<EditProject/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
