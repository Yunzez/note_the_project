import React from 'react'
import * as FcIcons from "react-icons/fc";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


export function getSidebarPages(userID, db) {
    var docRef = db.collection("users").doc(userID).collection("pages");
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.doc('1'))
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    return (
        <div>
            
        </div>
    )
}


export const SidebarPages = [{
    title: 'Getting Start',
    path: '/pages',
    icon: < FcIcons.FcOk /> ,
    className: 'nav-text'
}]

export default SidebarPages