import { linearProgressClasses } from '@mui/material'
import React from 'react'
import DefaultPage from './DefaultPage'
import {useParams } from 'react-router'
function RenderSelectedPage(props) {
    const {currentPageID} = useParams()
    console.log('hellp there ' + props.pageList)
    var redirectID = props.id;
    var idcount = 0;
    return(
        <div>
            please select a page
        </div>
    )
    

}

export default RenderSelectedPage