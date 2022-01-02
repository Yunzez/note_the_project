import './App.css';
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
// Switch 在新版本中是 Routes 

import RenderHome from './pages/Home'
import Example_1 from './pages/Example_1';
function App() {
  return (
    <main>
      <BrowserRouter>
      <section className='d-flex '>
        <NavBar/>
        
          <Routes>
            <Route exact path='/' element={<RenderHome />} />
            <Route exact path='/example' element={ <Example_1 />}/>
            
          </Routes>
        </section>
      </BrowserRouter>

    </main>
  );
}

export default App;
