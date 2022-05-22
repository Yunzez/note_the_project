
import React, { useEffect, useState } from 'react'
import './columnstyle.css'
import './NavBar.css'
import { Modal } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";

// import component widgets
import RenderNormalTextComponent from './RenderNormalTextComponent';
import RenderTodoListComponent from './RenderTodoListComponent';
import RenderMusicPlayerComponent from './RenderMusicPlayerComponent';
import RenderCalendarComponent from './RenderCalendarComponent';
import RenderBookMarkComponent from './RenderBookMarkComponent';
import EditableInput from './EditableInput';

// this function generate single widget as a functional element
function RenderWidget(props) {
    console.log("in RenderWidget")
    console.log(props.id)
    // var pageList = props.pageList;
    // const setPageList = props.setPageList
    var item = props.item;

    const setServerUpdate = props.setServerUpdate;
    // var serverUpdate = props.serverUpdate;
    // var pageID = props.pageID;
    var widgetPos = props.widgetPos
    var currentPage = props.currentPage;
    // current page is the page that we are on right now, do not add another element to keep track
    // use set Currentpage instead
    const setCurrentPage = props.setCurrentPage;
    var columnPos = props.pos // this keep tracks of column position



    const [toggle, setToggle] = useState(false);
    const handleClose = (() => { setToggle(false); setServerUpdate(true); setUpdate(true)})
    const [component, setComponent] = useState([]);
    const [position, setPosition] = useState(0)
    const [update, setUpdate] = useState(true);
    // check all the content of this widget;

    const handleShow = (() => {
        console.log("handle show")
        setUpdate(true);
        setToggle(true)
        console.log("current column: ", columnPos - 1, currentPage[columnPos - 1].widgets[widgetPos]);
        console.log("current widget position: ", widgetPos, position);
    });

    var newComp = []
    var currentWidgetInfo = currentPage[columnPos - 1].widgets[widgetPos]["content"];
    console.log(update)
    console.log(currentPage)

    
    if (update && currentWidgetInfo) {
        console.log("updating current page")
        if (Object.keys(currentWidgetInfo).length > 0) {
            Object.keys(currentWidgetInfo).map((item, index) => {
                console.log(currentWidgetInfo[item].text)
                if (currentWidgetInfo[item].type === "plain_text") {
                    console.log(currentWidgetInfo[item].text)
                    newComp.push(<RenderNormalTextComponent columnPos={columnPos} pos={position} setContent={setCurrentPage}
                        content={currentPage} widgetPos={widgetPos} text={currentWidgetInfo[item].text} />);
                }
            })

        }
        setComponent(newComp)
        setUpdate(false);
        setServerUpdate(true);
    }



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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <p>{item.title}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-9 col-xl-10'>
                            <div>
                                <p>Description</p>
                                <div>
                                    <div className="widget-input text-wrap rounded">
                                        <EditableInput className="widget-input text-wrap p-4" text='Give your widget a more detailed description' />
                                    </div>
                                    <input className="form-control d-none" type="text" placeholder="Give your widget a more detailed description" ></input>
                                </div>
                            </div>
                            <hr></hr>
                            {component.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className='d-flex justify-content-between'>
                                            <div className='flex-fill me-3'>
                                                {item}
                                            </div>
                                            <div>
                                                <BsIcons.BsX size={30} cursor='pointer' onClick={() => { deleteWidget(index) }} />
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>)
                            })}

                        </div>
                        <div className='col-lg-3 col-xl-2'>
                            <p>Add to Widget:</p>
                            <div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getText("") }}> <BsIcons.BsFileEarmarkFontFill className='me-2' />Plain Text </div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getTodoList() }}> <BsIcons.BsCheckSquareFill className='me-2' />Todo List</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getWebBookmark() }}> <BsIcons.BsFillBookmarkFill className='me-2' />Bookmark</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getCalendar() }}> <BsIcons.BsFillCalendarEventFill className='me-2' />Calendar </div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getMusicPlayer() }}> <BsIcons.BsDiscFill className='me-2' />Music</div>
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


    function deleteWidget(indexDelete) {
        var componentNew = []
        component.map((item, index) => {
            if (index !== indexDelete) {
                componentNew.push(item)
            }
        })
        setComponent(componentNew)
    }


    // action function to add comp
    function getText(text) {
        var newComp
        if (!text) {
            text = '';
        }
        console.log(text)

        console.log("create new one")
        newComp = <RenderNormalTextComponent columnPos={columnPos} pos={position} setContent={setCurrentPage}
            content={currentPage} widgetPos={widgetPos} text={text} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);


        console.log(component)
    }


    function getTodoList() {
        var newComp = <RenderTodoListComponent columnPos={columnPos} pos={position}
            setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);
    }

    function getWebBookmark() {
        var newComp = <RenderBookMarkComponent columnPos={columnPos} pos={position}
            setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);
    }

    function getCalendar() {
        var newComp = <RenderCalendarComponent columnPos={columnPos} pos={position}
            setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);
    }

    function getMusicPlayer() {
        var newComp = <RenderMusicPlayerComponent columnPos={columnPos} pos={position}
            setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);
    }


}





export default RenderWidget