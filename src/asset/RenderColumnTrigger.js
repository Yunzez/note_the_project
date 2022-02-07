import React, { useState } from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
import RenderColumn from './RenderColumn';

function RenderColumnTrigger(props) {
    var columnlist = props.columnlist;
    var setColumnlist = props.setColumnlist;
    var replaceColumn = [];
    const [input, setInput] = useState('')
    // give the window choice a hook
    const [window, setWindow] = useState(true)

    // create the first window user will see when enter
    var smallSenseBar = (
        <button className="btn btn-primary" onClick={handleOnClickExtend} >Add another column</button>
    )
    
    // create the second window 
    var declareWindow = (
        <div className='column-trigger p-1 col-sm-4 col-md-3'>
                <div className="form-group">
                    <p className="mb-1">New column:</p>
                    <input className="form-control mb-1 input-name" aria-describedby="emailHelp" placeholder="Column name" onChange={()=>{setInput(document.querySelector('.input-name').value)}}></input>
                </div>
                <button className="btn btn-primary" onClick={handleOnClickSecond} >Go</button>
        </div>
    )

    // handle first click -- extend the window
    function handleOnClickExtend(e){
        e.preventDefault();
        setWindow(!window); 
    }

    // handle second click -- shrink the window and add data to the list
    function handleOnClickSecond(e){
        e.preventDefault();
        var newcolumn = <RenderColumn name={input}/>
        //columnlist = [columnlist, newcolumn]
        columnlist.map(function(column, index){ 
            replaceColumn.push(column)
        })
        replaceColumn.push(newcolumn)
        console.log(replaceColumn)
        setColumnlist(replaceColumn);
        setWindow(!window);
    }
    

    // return trigger
    if(window){
        return smallSenseBar;
    }else{ 
        return declareWindow;
    }
        

    
}


export default RenderColumnTrigger
