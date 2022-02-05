import React, { useState } from 'react'
import './columnstyle.css'
import * as MuiMaterial from '@mui/material';
import RenderColumn from './RenderColumn';

function RenderColumnTrigger() {
    const [ret, setRet] = useState(
        <div className='col-md-4 column-trigger p-1'>
            <form>
                <div class="form-group">
                    <p className="mb-1">Start a new column here</p>
                    <input className="form-control mb-1 input-name" aria-describedby="emailHelp" placeholder="Enter column name"></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => { setRet(RenderColumn(document.querySelector('.input-name').value)) }}>Go</button>
            </form>
        </div>
    );

    return ret
}

function handleCreateNewColumn(input) {
    console.log(input.value)
    return RenderColumn(input.value)
}

export default RenderColumnTrigger
