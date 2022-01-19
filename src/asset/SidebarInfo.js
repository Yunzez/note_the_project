import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FcIcons from "react-icons/fc";
import * as RiIcons from "react-icons/ri";

export const SiderbarInfo = [
    {
        title:'setting',
        path:'/setting',
        icon:<FcIcons.FcSettings />,
        className:'nav-text'
    },
    {
        title:'favorite',
        path:'/favorite',
        icon:<FcIcons.FcLike/>,
        className:'nav-text'
    },
]