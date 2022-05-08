import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'

function RenderNormalTextComponent(props) {


    const [normalInput, setNormalInput] = useState('');
    var pos = props.pos
    var columnPos = props.columnPos
    var setContent = props.setContent;
    var content = props.content; // content is the parent's currentpage
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;
    var widgetPos = props.widgetPos;
    var tempContent = {
        type: "plain_text",
        text: ''
    } 


    return (
        <div>
            <div id={setupID} >
                <form>
                    <div className="form-group">

                        <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
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
        tempContent.text= normalInput;
        var replaceContent = [];
       

        // this part update the current page, both local and remote server depend on this 
        console.log(content[columnPos-1].widgets)// pos start at 1
        var thisWidget = content[columnPos-1].widgets
        thisWidget.forEach(item => {
            console.log(item.id, widgetPos)
            if (item.id == (widgetPos)){
                console.log(tempContent)
                item.content[pos] = tempContent
            }
        })
        console.log(thisWidget)

        replaceContent = content
        replaceContent[columnPos-1].widgets = thisWidget;
        
        setContent(replaceContent);
    }
}

export default RenderNormalTextComponent