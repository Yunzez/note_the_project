import React, { useState } from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
import RenderColumn from './RenderColumn';

function RenderColumnTrigger(props) {
    var columnlist = props.columnlist;
    var setColumnlist = props.setColumnlist;
    var replaceColumn;
    const [input, setInput] = useState('')
    
    console.log(input)

    function handleOnClick(){
        var newcolumn = <RenderColumn name={input}/>
        console.log(newcolumn)
        replaceColumn = [columnlist, newcolumn]
        setColumnlist(replaceColumn);
        console.log(replaceColumn + 'last')
    }

    //setColumnlist(replaceColumn.push(setRet(RenderColumn(document.querySelector('.input-name').value)))) 
    return (
        <div className='col-md-4 column-trigger p-1'>
                <div className="form-group">
                    <p className="mb-1">Start a new column here</p>
                    <input className="form-control mb-1 input-name" aria-describedby="emailHelp" placeholder="Enter column name" onChange={()=>{setInput(document.querySelector('.input-name').value)}}></input>
                </div>
                <button className="btn btn-primary" onClick={handleOnClick} >Go</button>
        </div>
    )
}


export default RenderColumnTrigger
