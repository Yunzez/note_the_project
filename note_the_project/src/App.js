import './App.css';
import React, { useState } from 'react'
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
// Switch 在新版本中是 Routes 

import RenderHome from './pages/Home'
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import DefaultPage from './pages/DefaultPage';
function App() {
  let login = false;

  const [sidebar, setSidebar] = useState(false)
    const showSidebar = async () => {
        setSidebar(!sidebar)
    }
    
    
  return (
    <main className={sidebar ? 'main active' : 'main'}>
      <BrowserRouter>
      <section >
        <NavBar login={login}/>
        
          <Routes>
            <Route exact path='/' element={<RenderHome />} />
            <Route exact path='/favorite' element={ <Favorite />}/>
            <Route exact path='/setting' element={ <Setting/>}/>
            <Route exact path='/default' element={ <DefaultPage/>}/>
            
          </Routes>
        </section>
      </BrowserRouter>

    </main>
  );
}

export default App;
