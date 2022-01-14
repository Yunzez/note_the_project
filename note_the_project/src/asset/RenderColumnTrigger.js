import React from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';

function RenderColumnTrigger() {
    
    return (
        <div className='col-md-4 column-trigger p-1'>
            <p className='heading'>type in your heading</p>
            <MuiMaterial.Divider light />
        </div>
    )
}

export default RenderColumnTrigger
