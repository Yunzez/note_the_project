import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'

function RenderNormalTextComponent(props) {
    
    console.log(props)
    var text = props.text;
    console.log(text);
    if (!text) {
        text = '';
    }
    const [normalInput, setNormalInput] = useState(text);
    
    console.log(normalInput);
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
        <React.Fragment>
            {text ? (
                 <div>
                 <div id={setupID} className='d-none '>
                     <form>
                         <div className="form-group">
 
                             <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
                         </div>
                     </form>
                     <div className='d-flex flex-row-reverse'>
                         <button onClick={() => { setupTextBox() }} className='btn add-widget mt-2'>Save</button>
                     </div>
                 </div>
                 <div id={showID} >
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
            ) : (
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
            )}

        </React.Fragment>
    )

    function setupTextBox() {
        document.getElementById(setupID).classList.add('d-none')
        document.getElementById(showID).classList.remove('d-none')
        console.log("curret text is:", normalInput);
        tempContent.text = normalInput;
        var replaceContent = [];


        // this part update the current page, both local and remote server depend on this 
        console.log(content[columnPos - 1].widgets)// pos start at 1
        var thisWidget = content[columnPos - 1].widgets
        var thisWidgetInfo = content[columnPos - 1].widgets[widgetPos].content

        // use the length of the object as key for next element
        var currentIndex = Object.keys(thisWidgetInfo).length;

        thisWidgetInfo[currentIndex] = tempContent;
        

        replaceContent = content
        replaceContent[columnPos - 1].widgets = thisWidget;

        setContent(replaceContent);
        console.log("currentPage:", content)
    }
}

export default RenderNormalTextComponent