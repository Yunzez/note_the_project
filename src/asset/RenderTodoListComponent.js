import React, { useState, useRef, useEffect } from 'react'
import * as BsIcons from "react-icons/bs";
import EditableInput from './EditableInput';

function RenderTodoListComponent(props) {
    const [input, setInput] = useState('');
    const [todo, setTodo] = useState([]);
    const inputRef = useRef(null);
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;

    var startTodo = (
        <div>
            <div className='d-flex justify-content-between'>
                <div class="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"></input>
                    {/* <input id={inputID} ref={inputRef} type="text" class="form-control" onChange={() => { setInput(document.getElementById(inputID).value) }}
                        placeholder="something to do" aria-label="something to do" aria-describedby="basic-addon2"></input> */}
                    <div id={showID} className="form-check-label" for="defaultCheck1">
                        <EditableInput text='something to do' />
                    </div>

                </div>
                <button className=' btn d-flex flex-row-reverse mt-2'><BsIcons.BsPlusSquareFill /></button>
            </div>
        </div>
    )

    if (todo.length == 0) {
        setTodo([startTodo])
    }

    

    return (
        <div>
            {todo.map((item, index) => {
                return (
                    <div>
                        {item}
                    </div>
                )
            })}
        </div>
    )
}

export default RenderTodoListComponent