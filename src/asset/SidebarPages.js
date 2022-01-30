import React from 'react'
import * as FcIcons from "react-icons/fc";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


export function getSidebarPages(userID, db) {
    var pageList = new Array;
    // var count = 1;
    // var docRef = db.collection("users").doc(userID).collection("pages")

    var output = db.collection("users").doc(userID).collection("pages").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            pageList.push(doc.data());
            console.log(pageList);
            
        });
        console.log(pageList);
    });
    
    console.log(pageList);
    return pageList


    //     if (doc.exists) {
    //         console.log('getting side bar info ', userID)
    //         console.log(doc.map(doc => doc.data()))
}
        // while (doc.doc(count) != null) {
        //     var docRef = db.collection("users").doc(userID).collection("pages").doc(count);
        //     console.log(doc.doc(toString(count)))
        //     count = count + 1

        //     docRef.get().then((doc) => {
        //         if (doc.exists) {
        //             console.log('getting side bar info ', userID)
        //             console.log(doc.data())

        //         }
        //     }).catch((error) => {
        //         console.log("Error getting document:", error);
        //     });
        // }

    // })
    // return pageList;



export const SidebarPages = [{
    title: 'Getting Start',
    path: '/pages',
    icon: < FcIcons.FcOk />,
    className: 'nav-text'
}]

export default getSidebarPages