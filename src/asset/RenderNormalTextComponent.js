import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'

function RenderNormalTextComponent(props) {
    // componentDidMount(){
    //     this.textarea.focus();
    //     autosize(this.textarea);
    // };

    const [normalInput, setNormalInput] = useState('');
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;


    return (
        <div>
            <div id={setupID} >
                <form>
                    <div className="form-group">
                        
                        <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput}/>
                    </div>
                </form>
                <div className='d-flex flex-row-reverse'>
                    <button onClick={() => { setupTextBox() }} className='btn add-widget mt-2'>Save</button>
                </div>
            </div>
            <div id={showID} className='d-none '>
                {/* <EditableInput text={normalInput}/> */}
                <div className='d-flex justify-content-between'>
                    <div>{normalInput}</div>
                    <div className='btn' onClick={() => {
                        document.getElementById(setupID).classList.remove("d-none")
                        document.getElementById(showID).classList.add('d-none')
                    }}><BsIcons.BsPencilSquare /></div>
                </div>
            </div>
        </div>
    )

    function setupTextBox() {
        document.getElementById(setupID).classList.add('d-none')
        document.getElementById(showID).classList.remove('d-none')
    }
}

export default RenderNormalTextComponent