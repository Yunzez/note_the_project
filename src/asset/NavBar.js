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
import { Button, Modal, closeButton } from 'react-bootstrap';

import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import 'firebase/compat/firestore';
//type rfce to set up the function like this 
import RenderHome from '../pages/Home'
import RenderSelectedPage from '../pages/RenderSelectedPage';
import { Dropdown } from 'react-bootstrap';

function NavBar(props) {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState('');
    const [rename, setRename] = useState('')
    var pageList = props.pageList;
    var setPageList = props.setPageList;
    var pageID = props.pageID;
    var setPageID = props.setPageID;

    console.log(pageList)
    //sign out function, need to change in the future
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    function showDropDown(index) {

        document.getElementById(index).classList.toggle('d-none')


    }

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
                                <div>
                                    <div key={index} className={line.className + ' ' + 'd-flex'} >
                                        <Link to={line.path} className='d-flex justify-content-between'>
                                            <div className='d-flex'>
                                                <div className='item-icon'> {<IconDetector name={line.icon} />} </div>
                                                <span className='item-title'>{line.title}</span>
                                            </div>

                                            {/* <div></div>
                                        <div></div>
                                        <div><FaIcons.FaTrash /></div> */}
                                        </Link>
                                        <div>
                                            <div className='sub-menu' onClick={() => { showDropDown(index) }}><BsIcons.BsThreeDotsVertical /></div>
                                        </div>

                                    </div>
                                    <div id={index} className="dropdown-content d-none position-absolute">
                                        <a onClick={() => { edit(index) }} className='dropdown-option d-flex justify-content-start m-1'>

                                            <FaIcons.FaPenSquare className='m-1' />
                                            <span className='font-weight-bold' data-toggle="modal" data-target="#exampleModal">Edit</span>
                                        </a>
                                        <a onClick={() => { like(index) }} className='dropdown-option d-flex justify-content-start m-1'>

                                            <BsIcons.BsHeart className='m-1' />
                                            <span>Favorite</span>
                                        </a>
                                        <a onClick={() => { deleteItem(index) }} className='dropdown-option d-flex justify-content-start m-1'>
                                            <FaIcons.FaTrash className='m-1' />
                                            <span>Delete</span>
                                        </a>
                                    </div>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <h5>Rename page: <strong>{line.title}</strong></h5>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="form-group">
                                                <input className="form-control rename-box" aria-describedby="emailHelp" placeholder="Name" onChange={() => { setRename(document.getElementsByClassName('rename-box')[0].value) }}></input>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <div variant="primary" onClick={()=>{handleNewName(index)}}>
                                                Save
                                            </div>
                                        </Modal.Footer>
                                    </Modal>
                                </div>

                            )
                        })}
                    </div>
                )
            }
            
        }
    }

    function handleNewName(num){
        handleClose()
        var temp = []
        console.log(pageList)
        pageList.map((item, index) => {
           if(index==num){
               item.title=rename
           }
           temp.push(item)
        })

        setPageList(temp)
    }

    console.log(rename)

    function edit(index) {
        console.log('in edit  ', index)
        handleShow()
        
    }

    function like(index) {
        console.log('in like  ', index)
    }

    function deleteItem(num) {
        console.log('in deleteItem  ', num)
        
        var temp = []
        pageList.map((item, index) => {
            if (index != num) {
                temp.push(item)
            }
        })

        setPageList(temp)
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
