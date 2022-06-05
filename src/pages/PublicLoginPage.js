import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../asset/NavBar.css"
import RenderHome from './Home'
import * as FaiSolid from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as BsIcons from "react-icons/bs";
function PublicLoginPage(props) {
    if (props.user != undefined) {
        console.log(props.user)
        console.log("have user")
        let currSection = document.querySelector('main')
        if (currSection) {
            currSection.classList.remove("main-close")
            currSection.classList.add("main")
        }


        return (
            <React.Fragment>
                <RenderHome />
            </React.Fragment>
        )
    } else {
        let currSection = document.querySelector('main')
        if (currSection) {
            if (currSection.classList.contains("main")) {
                currSection.classList.add("main-close")
                currSection.classList.remove("main")
            }
        }
        console.log("don't have user")
        return (
            <React.Fragment>
                <div className=" main-close ">
                    <div className="login-panel d-flex justify-content-around  bg-dark text-white shadow-lg ">
                        <div className="d-flex-column justify-content-center logo-text">
                            <h5 className="text-center">WELCOME TO NOTE THE PROJECT</h5>
                            <h5>Check out the code <a target="_blank" href="https://github.com/Yunzez/note_the_project">here</a></h5>
                        </div>
                        <div className=" d-flex-column p-5 rounded border text-center">
                            <BsIcons.BsFillKanbanFill className="logo-icon p-1 m-2" />
                            <small>Log in with your preferred option</small>
                            {props.loginWidget}
                            {/* have to give onClick a function instead of a call back, else it will run on the first time */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }



}

export default PublicLoginPage
