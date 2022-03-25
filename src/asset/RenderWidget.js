
import React, { useState, useRef } from 'react'
import './columnstyle.css'
import './NavBar.css'
import { Overlay } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";

// this function generate single widget as a functional element
function RenderWidget(props) {
    var item = props.item;
    const target = useRef(null);
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <div className='widget bg-white p-1 rounded mb-2 d-flex justify-content-between'>
                <div>
                    <p>{item.title}</p>
                </div>
                <div>
                    <div className='sub-menu pe-1 ps-1' ref={target} onClick={() => { setToggle(!toggle) }}><BsIcons.BsFillCaretDownFill/></div>
                </div>
            </div>
            <Overlay target={target.current} show={toggle} placement="bottom">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            color: 'white',
                            paddingLeft: '5%',
                            paddingTop: '5px',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        <div className="dropdown-content">
                            <a data-toggle="modal" data-target="#exampleModal" className='dropdown-option d-flex justify-content-start m-1'>

                                <FaIcons.FaPenSquare className='column-menuicon' />
                                <p className='mb-1'>Edit</p>
                            </a>
                            <a className='dropdown-option d-flex m-1 pe-1'>

                                <BsIcons.BsPinFill className='column-menuicon' />
                                <p className='mb-1'>Pin</p>
                            </a>
                            <a className='dropdown-option d-flex justify-content-start m-1 pe-1'>
                                <FaIcons.FaTrash className='column-menuicon' />
                                <p className='mb-1 me-3'>Delete</p>
                            </a>
                        </div>
                    </div>
                )}
            </Overlay>

        </div>
    )
}

export default RenderWidget