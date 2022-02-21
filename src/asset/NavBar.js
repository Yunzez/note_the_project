import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link, NavLink } from 'react-router-dom'
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
import * as FaIcons from "react-icons/fa";
import 'firebase/compat/firestore';
//type rfce to set up the function like this 
import RenderHome from '../pages/Home'
import RenderSelectedPage from '../pages/RenderSelectedPage';

function NavBar(props) {

    const [input, setInput] = useState('');

    var pageList = props.pageList;
    var setPageList = props.setPageList;
    var pageID = props.pageID;
    var setPageID = props.setPageID;
    
    console.log(pageList)
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


    
    var pages = () => {
        if (!props.user) {
            console.log(props.user)
            return (<div></div>)
        }
        else {
            if (pageList) {
                console.log(pageList[0])
                
                return (
                    <div>
                        {pageList.map((line, index) => {
                            
                            console.log(line)
                            return (
                                <div key={index} className={line.className}>
                                    <Link to={line.path}  className='d-flex justify-content-start'>
                                        <div className='item-icon'> {<IconDetector name={line.icon} />} </div>
                                        <span className='item-title'>{line.title}</span>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        }
    }
    // onClick={<RenderSelectedPage id={line.id} pageList={pageList}/>}

    function handlePageRedirect(id) {
        console.log('you clicked a icon of id' + id)
        
        RenderSelectedPage(id, pageList)
       
    }

    var IconDetector = ({ name }) => {
        if (name == 'Ok') {
            console.log('icon ok')
            return (
                <div><FcIcons.FcOk /></div>
            )
        } else {
            return (<div><FaIcons.FaFileAlt /></div>)
        }

    }

    function addNewPage() {
        var newPageList = [];
        var newPageElement = {
            id: pageID,
            title: input,
            path: '/pages/' + pageID,
            icon: 'default',
            className: 'nav-text',
            0: {
                name: 'hello',
                widgets: []
            }
        }

        setPageID(pageID + 1)

        pageList.map((element, index) => {
            newPageList.push(element)
        })
        newPageList.push(newPageElement);
        setPageList(newPageList)
        document.getElementsByClassName('add-page-form')[0].classList.add('d-none')
        document.getElementsByClassName('page-input')[0].value = ''
    }


    function handleAddPage() {
        var pageElement = document.getElementsByClassName('add-page-form')[0]
        pageElement.classList.remove('d-none')
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
                            <div className='d-none add-page-form p-1'>
                                <div className="form-group">
                                    <input className="form-control mb-1 page-input" aria-describedby="emailHelp" placeholder="Name" onChange={() => { setInput(document.getElementsByClassName('page-input')[0].value) }}></input>
                                </div>
                                <div className='d-flex justify-content-around'>
                                    <button className="btn page-yes-button me-1 w-100" onClick={addNewPage} >< FaIcons.FaRegCheckCircle /></button>
                                    <button className="btn page-cancel-button w-100" onClick={() => {
                                        document.getElementsByClassName('add-page-form')[0].classList.add('d-none');
                                        document.getElementsByClassName('page-input')[0].value = ''
                                    }} ><FaIcons.FaRegTimesCircle /> </button>
                                </div>
                            </div>
                        </div>
                        <a className='position-absolute fixed-bottom m-2 btn btn-primary add-page-button' onClick={handleAddPage}>+ new page</a>
                    </div>

                </aside >
            </div>

        )
    }

}

export default NavBar
