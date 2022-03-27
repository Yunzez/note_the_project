
import React, { useState, useRef } from 'react'
import './columnstyle.css'
import './NavBar.css'
import { Overlay, Modal, Button } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";

// this function generate single widget as a functional element
function RenderWidget(props) {
    var item = props.item;
    const target = useRef(null);
    const [toggle, setToggle] = useState(false);
    const handleClose = () => setToggle(false);
    const handleShow = () => setToggle(true);

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
                    <Modal.Title>Editing Widget {item.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-8'>
                            Content:
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Example textarea</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className='add-widget m-2 rounded widget-button p-2'>Update Content</div>
                        </div>
                        <div className='col-4'>
                            Option
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    Your changes are saved automatically
                </Modal.Footer>
            </Modal>
            {/* <Overlay target={target.current} show={toggle} placement="bottom">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            color: 'white',
                            paddingLeft: '5%',
                            paddingTop: '5px',
                            borderRadius: "3%",
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
            </Overlay> */}
        </div>
    )
}

export default RenderWidget