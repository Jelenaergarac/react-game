import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './container/Welcome'
import Game from './container/Game'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import Login from './container/Login';
import { useHistory } from 'react-router';
function App() {

  
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const history = useHistory()
  const signout = () => {
        auth.signOut().then(() => {
             dispatch(logout())
        })
      
    }
  
  useEffect(() => {
   
    auth.onAuthStateChanged(user => {
      if(user){
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }))
      }
    })
 
  },[])

   
  return (
    <div className="App">
      <Router>
        {!user ? (<><h3>Hi Guest</h3> 
        <Login /> </>
        ) :(
          <> 
          {user?.displayName}
              <button
           
            onClick={signout}
            src={user?.photoUrl}
            alt=""
            >Logout</button>
          </>
         )}
       
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          
          <Route exact path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
