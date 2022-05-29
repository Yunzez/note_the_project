import { getElementById } from 'domutils';
import React, { useState, useRef, useEffect } from 'react'
import * as BsIcons from "react-icons/bs";
import EditableInput from './EditableInput';
import './NavBar.css'
function RenderTodoListComponent(props) {

    console.log("in render todo component")
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const [progress, setProgress] = useState(0)
    var columnPos = props.columnPos
    var setContent = props.setContent;
    var widgetPos = props.widgetPos;
    var content = props.content;
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;
    var editableID = 'editable' + pos;
    var initialID = 'initial' + pos;
    var todoGroup = props.todoGroup;
    var todos = props.todos;

    var replaceTodo = []
    if (todos) {
        if (props.todos.length > 0) {
            for (let i = 0; i < todos.length; i++) {
                replaceTodo.push(<GenerateNewTodo content={todos[i]} />)
            }
        }
        console.log(content)
    }
    const [todo, setTodo] = useState(replaceTodo);
    



    return (
        <div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            {todo.map((item, index) => {
                return (
                    <div>
                        {item}
                    </div>
                )
            })}
            <div className='d-none btn add-widget-small mt-1' id={initialID} onClick={() => {
                document.getElementById(setupID).classList.toggle('d-none');
                document.getElementById(initialID).classList.toggle('d-none')
            }}><small>Add Item</small></div>
            <div id={setupID}>
                <input id={inputID} ref={inputRef} type="text" class="form-control" onChange={() => { setInput(document.getElementById(inputID).value) }}
                    placeholder="something to do" aria-label="something to do" aria-describedby="basic-addon2"></input>
                <div className='d-flex'>
                    <div className='btn add-widget-small mt-1' onClick={() => { addElement(input) }}><small>Add a Todo</small></div>
                    <BsIcons.BsXLg size={20} className='pointer-icon ms-2 mt-3 mb-2' onClick={() => {
                        document.getElementById(setupID).classList.toggle('d-none');
                        document.getElementById(initialID).classList.toggle('d-none')
                    }} />
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


        var thisWidgetInfo = content[columnPos - 1].widgets[widgetPos].content
        console.log(thisWidgetInfo)
        var currentTodo = [];
        var count = 0;
        var currentIndex = Object.keys(thisWidgetInfo).length;
        var tempContent = {
            group: todoGroup,
            type: "todo",
            todos: []
        }

        if (Object.keys(thisWidgetInfo).length != 0) {
            Object.keys(thisWidgetInfo).map((key) => {
                var item = thisWidgetInfo[key];
                if (item.type == "todo") {
                    if (item.group == todoGroup) {
                        item.todos.map((text) =>{
                            currentTodo.push(text)
                        })
                    }
                }
                count += 1;
            })
            currentIndex = count-1;
        }
        currentTodo.push(input)
        tempContent.todos = currentTodo;
        
        console.log(tempContent)
        var replaceContent = [];

        // this part update the current page, both local and remote server depend on this 
        console.log(content[columnPos - 1].widgets)// pos start at 1
        var thisWidget = content[columnPos - 1].widgets
        var thisWidgetInfo = content[columnPos - 1].widgets[widgetPos].content

        // use the length of the object as key for next element

        thisWidgetInfo[currentIndex] = tempContent;

        replaceContent = content
        replaceContent[columnPos - 1].widgets = thisWidget;

        setContent(replaceContent);
        console.log("currentPage:", content)
        // if we just added a new item
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