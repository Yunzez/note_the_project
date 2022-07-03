
import React, { useEffect, useState, useRef } from 'react'
import './columnstyle.css'
import './NavBar.css'
import { Modal, OverlayTrigger, Button, Popover, Overlay } from 'react-bootstrap';
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
    const handleClose = (() => { setToggle(false); setServerUpdate(true); setUpdate(true) })
    const [component, setComponent] = useState([]); // this keep track of all the component in a widget, as dom element
    const [update, setUpdate] = useState(true);
    const [todoGroup, setTodoGroup] = useState(0);
    const [isCover, setIsCover] = useState(false)
    // check all the content of this widget;

    const handleShow = (() => {
        setUpdate(true);
        setToggle(true)
        console.log("current widget position: ", columnPos - 1, widgetPos, position);
    });

    var newComp = []
    // solve edge case: when create a new column, there is no content
    var currentWidget = currentPage[columnPos - 1].widgets[widgetPos];
    var currentWidgetSize = Object.keys(currentWidget["content"]).length;

    const [position, setPosition] = useState(currentWidgetSize) // this keep track of a tooltip position


    console.log("current size ", position)
    if (currentWidget) {
        var currentWidgetInfo = currentWidget["content"];
    }



    if (update && currentWidgetInfo) {
        console.log("updating widget by its given info")
        console.log("current widget: (column position, widget info) ", columnPos - 1, currentPage[columnPos - 1].widgets[widgetPos]);
        let count = 0;
        if (Object.keys(currentWidgetInfo).length > 0) {
            Object.keys(currentWidgetInfo).map((item, index) => {
                console.log("preparing", currentWidgetInfo[item])
                if (currentWidgetInfo[item].type === "plain_text") {
                    newComp.push(<RenderNormalTextComponent columnPos={columnPos} pos={count} setContent={setCurrentPage}
                        content={currentPage} widgetPos={widgetPos} text={currentWidgetInfo[item].text} />);
                    count++
                    console.log(position)

                }
                if (currentWidgetInfo[item].type === "todo") {

                    newComp.push(<RenderTodoListComponent columnPos={columnPos} pos={count} setContent={setCurrentPage}
                        content={currentPage} widgetPos={widgetPos} todos={currentWidgetInfo[item].todos} todoGroup={todoGroup} />);
                    count++
                    setTodoGroup(todoGroup + 1);
                }
                if (currentWidgetInfo[item].type === "music") {
                    newComp.push(<RenderMusicPlayerComponent columnPos={columnPos} pos={count} setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} music={currentWidgetInfo[item]} />)
                    count++
                }
                if (currentWidgetInfo[item].type === "bookmark") {
                    newComp.push(<RenderBookMarkComponent columnPos={columnPos} pos={count} setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} />)
                    count++
                }
            })

        }
        setComponent(newComp)
        setUpdate(false);
        setServerUpdate(true);
    }

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };


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
                    <div className='d-flex flex-column w-100 '>
                        <div className='d-flex justify-content-between w-100'>
                            <div><p>{item.title}</p></div>

                            <div><Button className='top-widget m-2 rounded p-2 float-end' onClick={() => { if (isCover) { setIsCover(false) } else { setIsCover(true) }; console.log("click") }}><BsIcons.BsPaletteFill className='me-2' />Cover</Button></div>

                        </div>
                        <GetCoverOptions className="animated-cover-div" />


                    </div>

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
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getTodoList([]) }}> <BsIcons.BsCheckSquareFill className='me-2' />Todo List</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getWebBookmark() }}> <BsIcons.BsFillBookmarkFill className='me-2' />Bookmark</div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getCalendar() }}> <BsIcons.BsFillCalendarEventFill className='me-2' />Calendar </div>
                                <div className='add-widget m-2 rounded p-2' onClick={() => { getMusicPlayer() }}> <BsIcons.BsDiscFill className='me-2' />Music</div>
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
        // delete the widget locally
        var componentNew = []
        component.map((currItem, index) => {
            if (index !== indexDelete) {
                console.log(index, indexDelete)
                componentNew.push(currItem)
            }
        })
        console.log(componentNew)
        setComponent(componentNew)

        // delete the widget remotely
        console.log(currentPage[columnPos - 1].widgets[widgetPos].content)
        let newCurrentPage = currentPage
        console.log(Object.keys(newCurrentPage[columnPos - 1].widgets[widgetPos].content))
        delete newCurrentPage[columnPos - 1].widgets[widgetPos].content[Object.keys(newCurrentPage[columnPos - 1].widgets[widgetPos].content)[indexDelete]]
        console.log(newCurrentPage)

        setCurrentPage(newCurrentPage)
    }


    function GetCoverOptions() {
        if (isCover) {
            return (
                <div>
                    <h5>Cover</h5>
                    <div>Colors:
                        <div className='d-flex justify-content-center flex-wrap'>
                            <span className='pink color-option'><p></p> </span>
                            <span className='green color-option'> </span>
                            <span className='yellow color-option'> </span>
                            <span className='black color-option'> </span>
                            <span className='red color-option'> </span>
                            <span className='blue color-option'> </span>
                        </div>
                    </div>
                </div>
            )
        }
        return (<></>)
    }


    // action function to add comp
    function getText(text) {
        var newComp
        if (!text) {
            text = '';
        }

        newComp = <RenderNormalTextComponent columnPos={columnPos} pos={position} setContent={setCurrentPage}
            content={currentPage} widgetPos={widgetPos} text={text} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);

    }


    function getTodoList(todos) {
        var newComp = <RenderTodoListComponent columnPos={columnPos} pos={position}
            setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} todos={todos} todoGroup={todoGroup} />;
        var output = [];
        component.map((item, index) => (output.push(item)));
        output.push(newComp)
        setComponent(output)
        setPosition(position + 1);
        setTodoGroup(todoGroup + 1);
    }

    function getWebBookmark() {
        var newComp = <RenderBookMarkComponent columnPos={columnPos} pos={position} setContent={setCurrentPage} content={currentPage} widgetPos={widgetPos} />;
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

    function getMusicPlayer(savedSong) {
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