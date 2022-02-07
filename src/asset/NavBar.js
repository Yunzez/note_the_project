import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { BiArrowToTop } from "react-icons/bi";
import { SiderbarInfo } from './SidebarInfo';
import './NavBar.css';
import { getSidebarPages } from './SidebarPages';
//import Mui and Font awesome, we will be mainly using this ui
import * as MuiMaterial from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as FaiSolid from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';
import * as FcIcons from "react-icons/fc";
import 'firebase/compat/firestore';
//type rfce to set up the function like this 


function NavBar(props) {
    var pageList = props.pageList;

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    //sign out function, need to change in the future


    var handleSignOut = props.handleSignOut;

    var [sidebar, setSidebar] = useState(false)
    const showSidebar = async () => {
        setSidebar(!sidebar)
        var closemenuClass = document.getElementById('close-menu-arrow').classList;
        var openmenuClass = document.getElementById('open-menu-arrow').classList;
        closemenuClass.toggle('d-none')
        openmenuClass.toggle('d-none')
        document.querySelector('main').classList.toggle('main-close')

    }

    // detect login status


    let defaultElement = (

        <div>

            {SiderbarInfo.map((line, index) => {
                console.log(line.title)
                return (
                    <div key={index} className={line.className}>
                        <Link to={line.path} className='d-flex justify-content-start'>
                            <div className='item-icon'>{line.icon}</div>
                            <span className='item-title'>{line.title}</span>
                        </Link>

                    </div>
                )
            })}
            <MuiMaterial.Divider className='mb-1' />
        </div>


    )


    console.log(pageList)
    var pages = () => {
        return (
            <div>
                {pageList.map((line, index) => {
                    console.log('map test')
                    return (
                        <div key={index} className={line.className}>
                            <Link to={line.path} className='d-flex justify-content-start'>
                                <div className='item-icon'>{line.icon}</div>
                                <span className='item-title'>{line.title}</span>
                            </Link>

                        </div>
                    )
                })}
            </div>
        )
    }




    if (!props.user) {
        console.log(props.user)
        return (<div></div>)
    } else {
        var CurrentDate = new Date();
        console.log(props.login, 'normal sidebar')
        console.log(props.user.displayName, CurrentDate.getHours())
        let str = null;
        if (CurrentDate.getHours() >= 5 && CurrentDate.getHours() <= 11) {
            str = "Good Morning, "
        } else if (CurrentDate.getHours() >= 12 && CurrentDate.getHours() <= 18) {
            str = "Good Afternoon, "
        } else if (CurrentDate.getHours() >= 19 && CurrentDate.getHours() <= 23) {
            str = "Good Evening, "
        } else {
            str = "Good Night, "
        }

        return (
            <div>
                <header className="fixed-top header align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='' className="logo d-flex align-items-center">
                                <span className="d-none d-lg-block">Note the Project</span>
                            </Link>
                            <MuiMaterial.Divider className='mb-1' />
                            <div className='navbar-toggle ' id='navbar-toggle'>
                                <div onClick={showSidebar} className='menu-bars d-flex flex-row-reverse mb-2 ms-1 me-2 mt-2'>
                                    <FontAwesomeIcon id='open-menu-arrow' className='d-none' icon={FaiSolid.faArrowRight} />
                                    <FontAwesomeIcon id='close-menu-arrow' className='d-inline' icon={FaiSolid.faArrowLeft} />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                {str}<b>{props.user.displayName}</b>.
                            </div>
                            <Button onClick={handleSignOut} size="sm" className='menu-bars ms-3 me-3'>Sign Out</Button>
                        </div>
                    </div>
                </header>
                <aside>
                    <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <div className={sidebar ? 'nav-menu-items active' : 'nav-menu-items'} >
                            {defaultElement}
                            <li className="nav-heading">Pages</li>
                            {pages()}
                        </div>
                    </div>
                </aside >
            </div>

        )
    }

}

export default NavBar
