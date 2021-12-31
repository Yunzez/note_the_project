import './App.css';
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
// Switch 在新版本中是 Routes 

import Home from './pages/Home'
import Example_1 from './pages/Example_1';
function App() {
  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/example' exact element={<Example_1/>}/>
        </Routes>
      </BrowserRouter>

    </main>
  );
}

export default App;
