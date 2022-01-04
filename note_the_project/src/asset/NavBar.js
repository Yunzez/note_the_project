import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { BiArrowToTop } from "react-icons/bi";
import { SiderbarInfo } from './SidebarInfo';
import './NavBar.css';

//import Mui and Font awesome, we will be mainly using this ui
import * as MuiMaterial from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as FaiSolid from '@fortawesome/free-solid-svg-icons'
//type rfce to set up the function like this 


function NavBar(props) {
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = async() => {
        setSidebar(!sidebar)
        
        // let element = document.getElementsByClassName('nav-menu active')
        // if (element.length == 0) {
        //     let titles = document.querySelectorAll('.item-title');
        //     console.log(titles)
        //     //  await delay(1000);
        //     titles.forEach((title)=>{
        //         title.classList.add('d-inline');
        //         title.classList.remove('d-none');
        //     })
            
        // } else {
        //     let titles = document.querySelectorAll('.item-title');
        //     titles.forEach((title)=>{
        //         title.classList.add('d-none');
        //         title.classList.remove('d-inline');
        //     })
        // }
    }
    return (
        <nav>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className={sidebar ? 'nav-menu-items active' : 'nav-menu-items'} onMouseLeave={showSidebar} onMouseEnter={showSidebar}>
                    <div className='navbar-toggle '>
                        <Link to='/' className='menu-bars d-flex flex-row-reverse mb-2 me-2 mt-2'>
                            <FontAwesomeIcon id='open-menu-arrow' icon={FaiSolid.faArrowRight} />
                            <FontAwesomeIcon id='close-menu-arrow' icon={FaiSolid.faArrowLeft}  />
                        </Link>
                        <MuiMaterial.Divider className='mb-3'/>
                    </div>
                    {SiderbarInfo.map((line, index) => {
                        return (
                            <div key={index} className={line.className}>
                                <Link to={line.path} className='d-flex justify-content-start'>
                                    <div className='item-icon'>{line.icon }</div>
                                    <span className='item-title'>{line.title}</span>
                                    <div className="item-place-holder"></div>
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
