import './App.css'

import {
	BrowserRouter as Router,
	Route,
  Navigate, 
  Routes
} from 'react-router-dom'

import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { initializeApp } from "firebase/app"
import { useAuthState } from 'react-firebase-hooks/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD6dQw6uZhsHiue1k24toJjFXcxHNcyY4A",
  authDomain: "honker-6965a.firebaseapp.com",
  projectId: "honker-6965a",
  storageBucket: "honker-6965a.appspot.com",
  messagingSenderId: "28280491287",
  appId: "1:28280491287:web:df6896af671b135c74bb52",
  measurementId: "G-6167HNGGXN"
}

// Initialize Firebase
initializeApp(firebaseConfig)
const auth = getAuth()

function App() {
    const [user] = useAuthState(auth)

  	return (
  	  	<div className="App">
  	    	<Router>
  	      		<Routes>
  	        		<Route exact path='/' element ={ user ? <Protected /> : <Navigate to='/signin' /> } />
  	        		<Route exact path='/signin' element={ !user ? <SignIn temp={user} /> : <Navigate to='/' />} />
  	      		</Routes>
  	    	</Router>
  	  	</div>
  	)
}

const SignIn = () => {
	const googleSignIn = () => {
		signInWithPopup(auth, new GoogleAuthProvider())
	}

  	return (
		<button onClick={googleSignIn}>Sign In</button>
  	)
}

const Protected = () => {
  return(
    <>
      	<span>This is a protected page</span>
		<button onClick={() => {auth.signOut()}}>Sign Out</button>
    </>
  )
}

export default App;
