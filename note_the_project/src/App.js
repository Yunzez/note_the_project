import './App.css';
import React, { useState } from 'react'
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom'
// Switch 在新版本中是 Routes 

import RenderHome from './pages/Home'
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import DefaultPage from './pages/DefaultPage';
import Login from './pages/Login';
import PublicLoginPage from './pages/PublicLoginPage';
function App() {
  let login = false;


  if (!login) {
    console.log('you are not logged in')
  }

  return (
    <main>
      <BrowserRouter>
        <section className='main'>
          <NavBar login={login} />


          <Routes>
            <Route exact path='/public' exact element={<PublicLoginPage />} />
            <Route exact path='/' exact element={<RenderHome />} />
            {/* <Route exact path="/" render={() => (
              login ? (
                 <RenderHome />
                // <Navigate to="/home" />
              ) : (
                // <Navigate to="/public" />
                 <PublicLoginPage />
              )
            )} /> */}


            <Route exact path='/login' element={<Login />} />
            <Route exact path='/favorite' element={<Favorite />} />
            <Route exact path='/setting' element={<Setting />} />
            <Route exact path='/default' element={<DefaultPage />} />

          </Routes>
        </section>
      </BrowserRouter>

    </main>
  );
}

export default App;
