import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiBackstab } from "react-icons/gi";
import { BiArrowToTop } from "react-icons/bi";
import { SiderbarInfo } from './SidebarInfo';
import './NavBar.css';
import {IconContext} from 'react-icons'
//type rfce to set up the function like this 
function NavBar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div>
            <div className='navbar'>
                <Link to='#' className="project_logo">
                    <GiBackstab onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='/' className='menu-bars'>
                        <BiArrowToTop/>
                        </Link>
                    </li>
                    {SiderbarInfo.map((line, index) => {
                        return (
                            <li key={index} className={line.className}>
                                <Link to={line.path}>
                                    {line.icon}
                                    <span>{line.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
