import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
function RenderNormalTextComponent(props) {
    const [normalInput, setNormalInput] = useState();
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;
    
    
    return (
        <div>
            <div id={setupID} >
                <form>
                    <div className="form-group">
                        <textarea onChange={() => { setNormalInput(document.getElementById(inputID).value) }} className="form-control " id={inputID} rows="3"></textarea>
                    </div>
                </form>
                <div className='d-flex flex-row-reverse'>
                    <button onClick={() => { setupTextBox() }} className='btn add-widget mt-2'>Save</button>
                </div>
            </div>
            <div id={showID} className='d-none '>
                <EditableInput text={normalInput.value}/>
            </div>
        </div>
    )

    function setupTextBox() {
        document.getElementById(setupID).classList.add('d-none')
        document.getElementById(showID).classList.remove('d-none')
    }
}

export default RenderNormalTextComponent