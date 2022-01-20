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
import Login from './pages/Login';
import PublicLoginPage from './pages/PublicLoginPage';
import RefreshPlaceHolder from './pages/RefreshPlaceHolder';
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
    }
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
  console.log(user)


  // try login 
  useEffect(() => {// run after component loads, listen to the changes of auth state for log in 
    // determine if it is logged in or not 
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("log in", firebaseUser.displayName)
        setUser(firebaseUser)
        setIsLoading(false)
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

    // sign in function, not being used, sign in functionality is carried out in public home page
//   const HandleSignIn = (props) => {

//     if (props.user != undefined) {
//       return (<>
//         <NavBar user={user} handleSignOut={handleSignOut} />
//         <RenderHome user={props.user} handleSignOut={props.handleSignOut} /></>
//       )
//     } else {
//       console.log('no user status')
//       return (
//         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//       )
//     }
//   }


  if (isLoading) {
    return (
      <RefreshPlaceHolder />

    )
  }

  //old code that keep user status in local storage 

  // useEffect(() => {
  //   var loginStatus = window.localStorage.getItem('login')
  //   setLogin(JSON.parse(loginStatus))
  // },[])

  // useEffect(() => {
  //   window.localStorage.setItem('login', JSON.stringify(login))
  // });



  return (
    <main>

      <section className='main'>

        <BrowserRouter>

          <NavBar user={user} handleSignOut={handleSignOut} />

          <Routes>
            <Route exact path='/' exact element={<PublicLoginPage user={user} handleSignOut={handleSignOut} loginWidget={<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />} />} />
            <Route exact path='/home' exact element={<RenderHome />} />
            <Route exact path='/favorite' element={<Favorite user={user} />} />
            <Route exact path='/setting' element={<Setting user={user} />} />
            <Route exact path='/default' element={<DefaultPage />} />

          </Routes>
        </BrowserRouter>
      </section>


    </main>
  );
}

export default App;
