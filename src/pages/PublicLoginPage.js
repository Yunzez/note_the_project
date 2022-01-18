import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import RenderHome from './Home'
import NavBar from "../asset/NavBar";
function PublicLoginPage(props) {
    const navigate = useNavigate();

    if (props.user != undefined) {
        return (
            <>
                <RenderHome />
            </>
        )
    } else {
        return (
            <div>
                you are not logged in
                {props.loginWidget}
                {/* have to give onClick a function instead of a call back, else it will run on the first time */}
                <Link to='/home' onClick={() => {
                    props.setLogin(true)
                }}  >Skip Login for now</Link>
            </div>
        )
    }



}

export default PublicLoginPage
