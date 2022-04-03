
import React, { useState, useRef } from 'react'
import './columnstyle.css'
import './NavBar.css'
import { Overlay, Modal, Button } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";

// import component widgets
import RenderNormalTextComponent from './RenderNormalTextComponent';
import RenderTodoListComponent from './RenderTodoListComponent';


// this function generate single widget as a functional element
function RenderWidget(props) {
    var item = props.item;
    const target = useRef(null);
    const [toggle, setToggle] = useState(false);
    const handleClose = () => setToggle(false);
    const handleShow = () => setToggle(true);
    const [component, setComponent] = useState(['']);
    const [position, setPosition] = useState(0)

    return (
        <div>
            <div className='widget bg-white p-1 rounded mb-2 d-flex justify-content-between'>
                <div>
                    <p>{item.title}</p>
                </div>
                <div>
                    <div className='sub-menu pe-1 ps-1' onClick={handleShow}><BsIcons.BsFillCaretDownFill /></div>
                </div>
            </div>

            <Modal show={toggle} onHide={handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <p>{item.title}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-8'>
                            <div>
                                <p>Description</p>
                                <div>
                                    <div className="widget-input text-wrap rounded ps-2 pe-2">
                                        <p>Give your widget a more detailed description</p>
                                    </div>
                                    <input className="form-control d-none" type="text" placeholder="Give your widget a more detailed description" ></input>
                                </div>
                            </div>
                            {component.map((item, index) => {
                                console.log('in component mapping')
                                return (
                                    <div key={index}>
                                        {item}    
                                        <hr></hr>           
                                    </div>)
                            })}
                            
                        </div>
                        <div className='col-4'>
                            <p>Add to Widget:</p>
                            <div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getText() }}> <BsIcons.BsFileEarmarkFontFill className='me-2' />Normal Text </div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getTodoList() }}> <BsIcons.BsCheckSquareFill className='me-2' />Todo List</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getWebBookmark() }}> <BsIcons.BsFillBookmarkFill className='me-2' />Web Bookmark</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getCalendar()}}> <BsIcons.BsFillCalendarEventFill className='me-2' />Calendar </div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getMusicPlayer()}}> <BsIcons.BsDiscFill className='me-2' />Music</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { }}> <BsIcons.BsPaletteFill className='me-2' />Cover</div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )


    // action function to add comp
    function getText() {
        var newComp = <RenderNormalTextComponent pos={position}/>;
        var output = [];
        component.map((item, index) => ( output.push(item)));
        output.push(newComp)
        setComponent(output)

        setPosition(position+1);
    }


    function getTodoList() {
        var newComp = <RenderTodoListComponent pos={position}/>;
        var output = [];
        component.map((item, index) => ( output.push(item)));
        output.push(newComp)
        setComponent(output)
    }

    function getWebBookmark() {
        var newComp = <RenderTodoListComponent pos={position}/>;
        var output = [];
        component.map((item, index) => ( output.push(item)));
        output.push(newComp)
        setComponent(output)
    }

    function getCalendar() {
        var newComp = <RenderTodoListComponent pos={position}/>;
        var output = [];
        component.map((item, index) => ( output.push(item)));
        output.push(newComp)
        setComponent(output)
    }

    function getMusicPlayer() {
        var newComp = <RenderTodoListComponent pos={position}/>;
        var output = [];
        component.map((item, index) => ( output.push(item)));
        output.push(newComp)
        setComponent(output)
    }
}





export default RenderWidget