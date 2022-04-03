import React, { useState, useRef } from 'react'
import * as BsIcons from "react-icons/bs";

function RenderTodoListComponent() {
    const [input, setInput] = useState('');
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"></input>
                    <label class="form-check-label" for="defaultCheck1">
                        Default checkbox
                    </label>
                </div>
                <button className=' btn d-flex flex-row-reverse mt-2'><BsIcons.BsPlusSquareFill/></button>

            </div>
        </div>
    )
}

export default RenderTodoListComponent