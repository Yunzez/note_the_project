import React, { useState, useRef } from 'react'
import './columnstyle.css'
import './NavBar.css'
import * as MuiMaterial from '@mui/material';
import RenderWidget from './RenderWidget';
import { Overlay } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
function RenderColumn(props) {
    const target = useRef(null);
    const [columnToggle, setColumnToggle] = useState(false)
    let name = props.name;
    let pos = props.pos;
    let db = props.db;
    let pageID = props.pageID;
    let user = props.user;
    let pageList = props.pageList;
    let setPageList = props.setPageList;
    console.log('position   ', pos)
    if (!pos) {
        pos = 0
    }
    const [titleInput, setTitleInput] = useState('')
    const [widgetList, setWidgetList] = useState([])

    var currentPage;
    if(pageList){
        pageList.map((item)=>{
            if(item.id == pageID){
                currentPage = item
                // since pos starts at 1
                if(currentPage[pos-1].widgets != widgetList){
                    setWidgetList(currentPage[pos-1].widgets)
                }
                
            }
        })
        
    }
    
    




    if (name == '') {
        name = 'Untitle'
    }

    function handleAddWidget() {
        console.log('adding widget')
        document.getElementsByClassName('addWidgetButton')[pos-1].classList.toggle('d-none')
        document.getElementsByClassName('widgetTitle')[pos-1].classList.toggle('d-none')
    }

    function handleGoWidget() {
        setTitleInput(document.getElementsByClassName('input-title')[pos-1].value)
        console.log('creating widget', titleInput)
        var newWidget = {
            title: titleInput,
            type: 0,
            content: {}
        }
        console.log(titleInput)
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
        var targetPage;
        pageList.map((item) => {
            if (item.id == pageID) {
                targetPage = item;
                targetPage[pos-1].widgets.push(newWidget)
                temp.push(targetPage)

            } else {
                temp.push(item)
            }
        })
        setPageList(temp)

        // connect server
        console.log(temp, pageID)
        console.log(temp[pageID.toString()])
        db.collection("users").doc(user.uid).collection("pages")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, pageID)
                    if (doc.id == pageID) {
                        console.log('found page')
                        db.collection("users").doc(user.uid).collection("pages").doc(pageID.toString()).set(targetPage).then(() => {
                            console.log("widget successfully added!");

                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                })
            });


        document.getElementsByClassName('input-title')[pos-1].value = ''
        document.getElementsByClassName('addWidgetButton')[pos-1].classList.toggle('d-none')
        document.getElementsByClassName('widgetTitle')[pos-1].classList.toggle('d-none')

    }



    console.log(columnToggle)
    console.log('rendering widgets')
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
                    console.log('update widget')
                    return (
                        <RenderWidget item={item} index={index} />

                    )
                })}
            </div>
            <a className="addWidgetButton btn mx-auto add-widget" onClick={() => { handleAddWidget() }}>Add a widget</a>

            <div className='d-none widgetTitle'>
                <div className="form-group ">
                    <input className="form-control mb-1 input-title" aria-describedby="title" placeholder="Widget Title"
                        onChange={
                            () => { setTitleInput(document.getElementsByClassName('input-title')[pos-1].value) }}></input>
                </div>
                <button className="btn btn-primary" onClick={() => { handleGoWidget() }}>Go</button>
            </div>


        </div>


    )
}

export default RenderColumn
