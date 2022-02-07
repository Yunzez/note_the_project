import React from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
import RenderColumnTrigger from './RenderColumnTrigger';
function RenderColumn(props) {
    let name = props.name;

    return (
        <div className=' column p-1'>
            <p className='heading'>{name}</p>
            <MuiMaterial.Divider light />
            <div>
                This is a new page!
            </div>

        </div>
        

    )
}

export default RenderColumn
