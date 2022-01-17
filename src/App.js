import './App.css';
import React, { useState, useEffect} from 'react'
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

//import firebase component 
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

function App() {
  const [login, setLogin] = useState(false);
  console.log(login)

  useEffect(() => {
    var loginStatus = window.localStorage.getItem('login')
    setLogin(JSON.parse(loginStatus))
  },[])

  useEffect(() => {
    window.localStorage.setItem('login', JSON.stringify(login))
  });
  
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
