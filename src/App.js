import './App.css';
import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import NavBar from './asset/NavBar';
import { BrowserRouter, Routes, Route, Navigate, Link, NavLink, useParams } from 'react-router-dom'
import * as FcIcons from "react-icons/fc";
// Switch 在新版本中是 Routes 

import RenderHome from './pages/Home'
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import DefaultPage from './pages/DefaultPage';
import PublicLoginPage from './pages/PublicLoginPage';
import RefreshPlaceHolder from './pages/RefreshPlaceHolder';
import { getSidebarPages } from './asset/SidebarPages'
import { SidebarPages } from './asset/SidebarPages'
import RenderSelectedPage from './pages/RenderSelectedPage';

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
  const [pageList, setPageList] = useState(undefined);
  const [pageID, setPageID] = useState(1);

  var userID;



  // try login and set user status
  useEffect(() => {// run after component loads, listen to the changes of auth state for log in 
    // determine if it is logged in or not 
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('user logged in ')
        userID = firebaseUser.uid
        console.log(userID)
        setUser(firebaseUser)
        console.log('runing get page')
        updateUserDB(firebaseUser)
        if (!pageList) {
          getSidebarPages(userID, db, setPageList)
        }
        setIsLoading(false)

      } else {
        console.log('no user')
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
          .then(() => {
            console.log("Document written with ID: ", user.uid);
          })
          .catch((error) => {
            console.log(user.uid)
            console.error("Error adding document: ", error);
          });
      } else {
        console.log("you already have data")
      }
    })

    var defaultIcon = <FcIcons.FcOk />
    // adding the first page with an ID of 1, there are errors
    var docRef = db.collection("users").doc(user.uid).collection("pages").doc("1")
    docRef.get().then((doc) => {
      if (!doc.exists) {

        var defaultElement = {
          id: 0,
          title: 'Getting Start',
          path: '/pages',
          icon: 'Ok',
          className: 'nav-text',
          0: {
            name: 'Getting Started here',
            widgets: []
          }
        }

        db.collection("users").doc(user.uid).collection("pages").doc("0").set(defaultElement)
        setPageList(defaultElement)
          .then(() => {
            console.log("Document written with ID: ", user.uid);
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
      <BrowserRouter>
        <section className='main'>



          <NavBar
            user={user} userID={userID} db={db} pageList={pageList}
            setPageList={setPageList} handleSignOut={handleSignOut}
            pageID={pageID} setPageID={setPageID}
          />

          <Routes>
            <Route exact path='/' exact element={<PublicLoginPage user={user}
              handleSignOut={handleSignOut}
              loginWidget={<StyledFirebaseAuth uiConfig={uiConfig}
                firebaseAuth={firebase.auth()} />} />} />
            <Route exact path='/home' exact element={<RenderHome />} />
            <Route exact path='/favorite' element={<Favorite user={user} />} />
            <Route exact path='/setting' element={<Setting user={user} />} />
            <Route path='/pages' element={<RenderSelectedPage />} > 
              <Route path=':currentPageID' element={DefaultPage}/>
            </Route>

          </Routes>

        </section>
      </BrowserRouter>

    </main>
  );
}

export default App;
