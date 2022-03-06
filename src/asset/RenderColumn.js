import React, { useState } from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
import RenderColumnTrigger from './RenderColumnTrigger';
function RenderColumn(props) {
    let name = props.name;
    let pos = props.pos; 
    console.log(pos)
    if(!pos){
        pos = 0
    }
    const [titleInput, setTitleInput] = useState('')
    const [widgetList, setWidgetList] = useState([])

    if (name == '') {
        name = 'Untitle'
    }

    function handleAddWidget() {
        console.log('adding widget')
        document.getElementsByClassName('addWidgetButton')[pos].classList.toggle('d-none')
        document.getElementsByClassName('widgetTitle')[pos].classList.toggle('d-none')
    }

    function handleGoWidget() {
        setTitleInput(document.getElementsByClassName('input-title')[pos].value)
        console.log('creating widget', titleInput)
        var newWidget = {
            title: titleInput,
            type: 0,
            content: {}
        }
        console.log(titleInput)
        var temp = []
        if (widgetList.length > 0) {
            widgetList.map((item, index) => {
                temp.push(item)
            })
            temp.push(newWidget)
        } else {
            temp.push(newWidget)
        }
        setWidgetList(temp)
        setTitleInput('')
        document.getElementsByClassName('input-title')[pos].value = ''
        document.getElementsByClassName('addWidgetButton')[pos].classList.toggle('d-none')
        document.getElementsByClassName('widgetTitle')[pos].classList.toggle('d-none')
        
    }


    console.log(widgetList)


    return (
        <div className='column p-2'>
            <p>{name}</p>
            <div>
                {widgetList.map((item, index) => {
                    console.log('updae widget')
                    return (
                        <div className='widget bg-white p-1 rounded mb-2'>
                            <p>{item.title}</p>
                        </div>
                    )
                })}
            </div>
            <a className="addWidgetButton btn mx-auto add-widget" onClick={() => { handleAddWidget() }}>Add a widget</a>

            <div className='d-none widgetTitle'>
                <div className="form-group ">
                    <input className="form-control mb-1 input-title" aria-describedby="title" placeholder="Widget Title"
                        onChange={
                            () => { setTitleInput(document.getElementsByClassName('input-title')[pos].value) }}></input>
                </div>
                <button className="btn btn-primary" onClick={() => { handleGoWidget() }}>Go</button>
            </div>

           
        </div>


    )
}

export default RenderColumn
