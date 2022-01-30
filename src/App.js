import './App.css';
import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom'
// Switch 在新版本中是 Routes 

import RenderHome from './pages/Home'
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import DefaultPage from './pages/DefaultPage';
import PublicLoginPage from './pages/PublicLoginPage';
import RefreshPlaceHolder from './pages/RefreshPlaceHolder';
import {getSidebarPages} from './asset/SidebarPages'

//import firebase component 
import StyledFirebaseAuth from 'react-firebaseui/FirebaseAuth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCuf5hQVhk0wzVqTze_2l41bIcyUyBtYM",
  authDomain: "project-n-41306.firebaseapp.com",
  projectId: "project-n-41306",
  storageBucket: "project-n-41306.appspot.com",
  messagingSenderId: "1095874500482",
  appId: "1:1095874500482:web:63dcc0bc5d5f262f9ee19b"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export const uiConfig = {
  //sign in provider
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup', // show popup when sign in with google
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}



function App() {

  // declare user and loading page status
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  var userID; 
  var pageList = getSidebarPages(userID, db);


  // try login and set user status
  useEffect(() => {// run after component loads, listen to the changes of auth state for log in 
    // determine if it is logged in or not 
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        userID = firebaseUser.uid
        console.log(userID)
        setUser(firebaseUser)
        setIsLoading(false)
        updateUserDB(firebaseUser)
        pageList = getSidebarPages(userID, db)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return function cleanup() {
      authUnregisterFunction()
    }
  }, [])

  //sign out function
  const handleSignOut = () => {
    console.log("click sign out")
    firebase.auth().signOut();
  }



  if (isLoading) {
    return (
      <RefreshPlaceHolder />

    )
  }


  function updateUserDB(user) {
    //console.log(JSON.parse(default_page))
    var docRef = db.collection("users").doc(user.uid)
    docRef.get().then((doc) => {
      if (!doc.exists) {
        db.collection("users").doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName

        })
        // adding the first page with an ID of 1, there are errors
        db.collection("users").doc(user.uid).collection("pages").doc("1").set({
          title: 'Getting Start',
          path: '/pages',
          icon: "< FcIcons.FcOk />",
          className: 'nav-text'
        })

          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        console.log("you already have data")
      }
    })
    console.log("update user data", user.displayName);

  }


  return (
    <main>

      <section className='main'>

        <BrowserRouter>

          <NavBar user={user} userID={userID} db={db} handleSignOut={handleSignOut} />

          <Routes>
            <Route exact path='/' exact element={<PublicLoginPage user={user} handleSignOut={handleSignOut} loginWidget={<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />} />} />
            <Route exact path='/home' exact element={<RenderHome />} />
            <Route exact path='/favorite' element={<Favorite user={user} />} />
            <Route exact path='/setting' element={<Setting user={user} />} />
            <Route exact path='/pages' element={<DefaultPage />} />

          </Routes>
        </BrowserRouter>
      </section>


    </main>
  );
}

export default App;
