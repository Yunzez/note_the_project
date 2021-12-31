import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiBackstab } from "react-icons/gi";
import { BiArrowToTop } from "react-icons/bi";
import * as FcIcons from "react-icons/fc";


export const SiderbarInfo = [
    {
        title:'home',
        path:'/',
        icon:<FcIcons.FcHome />,
        className:'nav-text'
    },
    {
        title:'Gallery',
        path:'/gallery',
        icon:<FcIcons.FcStart/>,
        className:'nav-text'
    },
    {
        title:'Setting',
        path:'/setting',
        icon:<FcIcons.FcAutomatic/>,
        className:'nav-text'
    },
    {
        title:'example1',
        path:'/example',
        icon:<FcIcons.FcNightLandscape />,
        className:'nav-text'
    },
    {
        title:'example2',
        path:'/',
        icon:<FcIcons.FcPuzzle/>,
        className:'nav-text'
    },
]