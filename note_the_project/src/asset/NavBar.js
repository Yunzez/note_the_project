import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { BiArrowToTop } from "react-icons/bi";
import { SiderbarInfo } from './SidebarInfo';
import './NavBar.css';
import { IconContext } from 'react-icons'
//type rfce to set up the function like this 
function NavBar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div className='d-flex'>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                <ul className={sidebar ? 'nav-menu-items active' : 'nav-menu-items'} onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='/' className='menu-bars'>
                            <BiArrowToTop />
                        </Link>
                    </li>
                    {SiderbarInfo.map((line, index) => {
                        return (
                            <li key={index} className={line.className}>
                                <Link to={line.path}>
                                    {line.icon}
                                    <span className='item-title'>{line.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                {/* <div className='navbar'>
                    <Link to='#' className="project_logo">
                        <FiMenu className='ms-1 me-1 ' onMouseOver={showSidebar} />
                    </Link>
                </div> */}
            </div>




        </div>
    )
}

export default NavBar
