import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RenderHome from './Home'
function PublicLoginPage(props) {
    if (props.user != undefined) {
        console.log(props.user)
        console.log("have user")
        return (
            <>
                <RenderHome />
            </>
        )
    } else {
        console.log("don't have user")
        return (
            <div className="justify-content-between align-items-center">
                {props.loginWidget}
                {/* have to give onClick a function instead of a call back, else it will run on the first time */}
            </div>
        )
    }



}

export default PublicLoginPage
