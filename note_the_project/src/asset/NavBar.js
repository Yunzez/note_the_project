import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { BiArrowToTop } from "react-icons/bi";
import { SiderbarInfo } from './SidebarInfo';
import './NavBar.css';

//import Mui and Font awesome, we will be mainly using this ui
import * as MuiMaterial from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as FaiSolid  from '@fortawesome/free-solid-svg-icons'
//type rfce to set up the function like this 


function NavBar(props) {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <nav>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className={sidebar ? 'nav-menu-items active' : 'nav-menu-items'} onMouseLeave={showSidebar} onMouseEnter={showSidebar}>
                    <div className='navbar-toggle '>
                        <Link to='/' className='menu-bars d-flex flex-row-reverse mb-2 me-2 mt-2'>
                        <FontAwesomeIcon id='open-menu-arrow' icon={FaiSolid.faArrowRight} size="md"/>
                        <FontAwesomeIcon  id='close-menu-arrow' icon={FaiSolid.faArrowLeft}size="md"/>
                        </Link>
                    </div>
                    {SiderbarInfo.map((line, index) => {
                        return (
                            <div key={index} className={line.className}>
                                <Link to={line.path}>
                                    {line.icon}
                                    <span className='item-title'>{line.title}</span>
                                    <MuiMaterial.Divider />
                                </Link>

                            </div>
                        )
                    })}
                </div>

            </div>



        </nav>
    )
}

export default NavBar
