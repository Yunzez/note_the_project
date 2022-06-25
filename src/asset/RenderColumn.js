import React, { useState, useRef, useEffect } from 'react'
import './columnstyle.css'
import './NavBar.css'
import RenderWidget from './RenderWidget';
import { Overlay } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
function RenderColumn(props) {
    const target = useRef(null);
    const [columnToggle, setColumnToggle] = useState(false)
    const [widgetPos, setWidgetPos] = useState(0)
    var name = props.name;
    var pos = props.pos;
    var db = props.db;
    var pageID = props.pageID;
    var user = props.user;
    var pageList = props.pageList;
    var setPageList = props.setPageList;
    if (!pos) {
        pos = 0
    }

    let tempPage;

    const [titleInput, setTitleInput] = useState('')
    const [widgetList, setWidgetList] = useState([])
    const [serverUpdate, setServerUpdate] = useState(false)

    
    if (pageList) {
        pageList.map((item) => {
            if (item.id == pageID) {
                tempPage = item
                // since pos starts at 1
                if (tempPage[pos - 1].widgets != widgetList) {
                    setWidgetList(tempPage[pos - 1].widgets)
                }

            }
        })

    }

    const [currentPage, setCurrentPage] = useState(tempPage)


    if (name == '') {
        name = 'Untitle'
    }

    function handleAddWidget() {
        document.getElementsByClassName('addWidgetButton')[pos - 1].classList.toggle('d-none')
        document.getElementsByClassName('widgetTitle')[pos - 1].classList.toggle('d-none')
    }

    function handleGoWidget() {
        setTitleInput(document.getElementsByClassName('input-title')[pos - 1].value)
        
        var newWidget = {
            id: widgetPos,
            title: titleInput,
            content: {}
        }
        setWidgetPos(widgetPos + 1);
    
        var temp = []
        if (widgetList.length > 0) {
            widgetList.map((item, index) => {
                temp.push(item)
            })
            temp.push(newWidget)
        } else {
            temp.push(newWidget)
        }
        setWidgetList(temp)
        setTitleInput('')
        var temp = []

        if (pageList) {
            pageList.map((item) => {
                if (item.id == pageID) {
                    currentPage[pos - 1].widgets.push(newWidget)
                    temp.push(currentPage)
                } else {
                    temp.push(item)
                }
            })
            setPageList(temp)


            // connect server

            db.collection("users").doc(user.uid).collection("pages").doc(pageID.toString())
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        // console.log('found page')
                        db.collection("users").doc(user.uid).collection("pages").doc(pageID.toString()).set(currentPage).then(() => {
                            console.log("widget successfully added!");
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                })
        }

        document.getElementsByClassName('input-title')[pos - 1].value = ''
        document.getElementsByClassName('addWidgetButton')[pos - 1].classList.toggle('d-none')
        document.getElementsByClassName('widgetTitle')[pos - 1].classList.toggle('d-none')

    }


    // update page when user close the modal
    useEffect(() => {
        console.log("current state of serverUpdate:  ", serverUpdate);
        if (serverUpdate) {
            var tempPageList = [];
            pageList.map((item) => {
                if (item.id == pageID) {
                    tempPageList.push(currentPage)
                } else {
                    tempPageList.push(item)
                }
            })
            console.log(currentPage)
            setPageList(tempPageList)


            //!!!!!!
            // still testing, this code WORKS, it update selected page to the server, but the other 
            // component are waited to be fix


            db.collection("users").doc(user.uid).collection("pages").doc(pageID.toString())
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log('found page')
                        db.collection("users").doc(user.uid).collection("pages").doc(pageID.toString()).set(currentPage).then(() => {
                            console.log("updating test within modal!!!!!!!");

                        }).catch((error) => {
                            console.error("Error updating tooltip ", error);
                        });
                    }

                });
            console.log(pageList)
            setServerUpdate(false);

        }
    }, [serverUpdate])




    return (
        <div className='column p-2'>
            <div className='d-flex justify-content-between'>
                <p>{name}</p>
                <div>
                    <div className='sub-menu pe-1 ps-1' ref={target} onClick={() => { setColumnToggle(!columnToggle) }}><BsIcons.BsThreeDots /></div>
                </div>
            </div>
            <Overlay target={target.current} show={columnToggle} placement="bottom">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            color: 'white',
                            paddingLeft: '5%',
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


            <div>
                {widgetList.map((item, index) => {
                   
                    return (
                        <RenderWidget id={`widget${widgetPos}`} 
                            item={item} 
                            // serverUpdate={serverUpdate} 
                            setServerUpdate={setServerUpdate} 
                            index={index}
                            // pageList={pageList}
                            // setPageList={setPageList}
                            pos={pos}
                            // pageID={pageID}
                            currentPage = {currentPage}
                            setCurrentPage = {setCurrentPage}
                            widgetPos = {index} />
                    )
                })}
            </div>
            <a className="addWidgetButton btn mx-auto add-widget" onClick={() => { handleAddWidget() }}>Add a widget</a>

            <div className='d-none widgetTitle'>
                <div className="form-group ">
                    <input className="form-control mb-1 input-title" aria-describedby="title" placeholder="Widget Title"
                        onChange={
                            () => { setTitleInput(document.getElementsByClassName('input-title')[pos - 1].value) }}></input>
                </div>
                <button className="btn btn-primary" onClick={() => { handleGoWidget() }}>Go</button>
            </div>
        </div>

    )

}

export default RenderColumn
