import React from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
function RenderColumn(props) {
    let name = props.name;

    return (


        <div className='col-md-4 column p-1'>
            <p className='heading'>{name}</p>
            <MuiMaterial.Divider light />
            <div>
                This is the starting page and this is your first List!
            </div>
        </div>

    )
}

export default RenderColumn
