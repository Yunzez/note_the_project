import { getElementById } from 'domutils';
import React, { useState, useRef, useEffect } from 'react'
import * as BsIcons from "react-icons/bs";
import EditableInput from './EditableInput';
import './NavBar.css'
function RenderTodoListComponent(props) {
    const [input, setInput] = useState('');
    const [todo, setTodo] = useState([]);
    const inputRef = useRef(null);
    const [progress, setProgress] = useState(0)
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;
    var editableID = 'editable' + pos;
    var initialID = 'initial'+pos;





    return (
        <div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            {todo.map((item, index) => {
                return (
                    <div>
                        {item}
                    </div>
                )
            })}
            <div className='d-none btn add-widget-small mt-1' id={initialID} onClick={() => { document.getElementById(setupID).classList.toggle('d-none');
                                                                                        document.getElementById(initialID).classList.toggle('d-none')}}><small>Add Item</small></div>
            <div id={setupID}>
                <input id={inputID} ref={inputRef} type="text" class="form-control" onChange={() => { setInput(document.getElementById(inputID).value) }}
                    placeholder="something to do" aria-label="something to do" aria-describedby="basic-addon2"></input>
                <div className='d-flex'>
                    <div className='btn add-widget-small mt-1' onClick={() => { addElement(input) }}><small>Add a Todo</small></div>
                    <BsIcons.BsXLg size={20} className ='pointer-icon ms-2 mt-3 mb-2'onClick={()=>{document.getElementById(setupID).classList.toggle('d-none');
                                                                                                    document.getElementById(initialID).classList.toggle('d-none')}}/>
                </div>
            </div>
        </div>
    )


    function addElement(input) {
        var newElem = <GenerateNewTodo content={input} />
        var temp = [];
        todo.map((item, index) => {
            temp.push(item)
        })
        temp.push(newElem)
        setTodo(temp);
        setInput('');
        document.getElementById(inputID).value = '';

    }


    function GenerateNewTodo(props) {
        return (
            <div className='d-flex'>
                <input className="mt-2" type="checkbox" value="" id="defaultCheck1"></input>
                <div id={showID} className="form-check-label" for="defaultCheck1">
                    <EditableInput text={props.content} id={editableID} />
                </div>
            </div>
        )
    }
}

export default RenderTodoListComponent