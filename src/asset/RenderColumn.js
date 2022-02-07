import React from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
import RenderColumnTrigger from './RenderColumnTrigger';
function RenderColumn(props) {
    let name = props.name;
    if (name == ''){
        name = 'Untitle'
    }
    return (
        <div className='column p-2'>
            <p>{name}</p>
            <a className="btn mx-auto add-widget" >Add a widget</a>

        </div>
        

    )
}

export default RenderColumn
