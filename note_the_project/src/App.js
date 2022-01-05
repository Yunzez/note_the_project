import './App.css';
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
// Switch 在新版本中是 Routes 

import RenderHome from './pages/Home'
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
function App() {
  let login = false;
  return (
    <main>
      <BrowserRouter>
      <section className='d-flex '>
        <NavBar login={login}/>
        
          <Routes>
            <Route exact path='/' element={<RenderHome />} />
            <Route exact path='/favorite' element={ <Favorite />}/>
            <Route exact path='/setting' element={ <Setting/>}/>
            
          </Routes>
        </section>
      </BrowserRouter>

    </main>
  );
}

export default App;
