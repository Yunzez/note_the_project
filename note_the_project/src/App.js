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
  const [login, setLogin] = useState(false);


  if (!login) {
    console.log('you are not logged in')
  }

  return (
    <main>
      
        <section className='main'>
        <BrowserRouter>
        <NavBar login={login} setLogin={setLogin}/>


          <Routes>
            <Route exact path='/' exact element={<PublicLoginPage setLogin={setLogin}/>} />
            <Route exact path='/home' exact element={<RenderHome />} />
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
          </BrowserRouter>
        </section>
      

    </main>
  );
}

export default App;
