import React from 'react'
import * as FcIcons from "react-icons/fc";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link, NavLink } from 'react-router-dom'

export function getSidebarPages(userID, db, setPageList) {

    var pageList = new Array;
    db.collection("users").doc(userID).collection("pages").get().then((querySnapshot) => {
        (querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            pageList.push(doc.data())
        }));
        console.log(pageList)
        setPageList(pageList)
    });
    return pageList

    // var getPageListData = async () => {
    //     var newPageList = await pageListData;
    //     return newPageList
    // }
    //  console.log(getPageListData)

    // console.log(newList)
    // return newList
}




export const SidebarPages = [{
    title: 'Getting Start',
    path: '/pages',
    icon: < FcIcons.FcOk />,
    className: 'nav-text'
}]

export default getSidebarPages