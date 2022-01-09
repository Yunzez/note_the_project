import React, { useState } from 'react'
import './columnstyle.css'
function DefaultPage() {
    let columnList = []
    const [columnlist, setColumnlist] = useState(columnList)
    if (columnlist.length <= 4) {

    }
    return (
        <div className='row'>
            <div className='col-3 column '>
                <div>
                    This is the starting page and this is your first column!
                </div>
            </div>
            <div className='col-3 column '>
                <div>
                    This is the starting page and this is your first column!
                </div>
            </div>
            <div className='col-3 column '>
                <div>
                    This is the starting page and this is your first column!
                </div>
            </div>
            <div className='col-3 column'>
                <div>
                    This is the starting page and this is your first column!
                </div>
            </div>
            <div className='col-3 column'>
                <div>
                    This is the starting page and this is your first column!
                </div>
            </div>
        </div>
    )
}

export default DefaultPage
