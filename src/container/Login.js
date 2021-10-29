import React from 'react'
import { useDispatch } from 'react-redux'
import { auth, provider } from '../firebase'


const Login = () => {
    const dispatch = useDispatch()

    const login = () => {
        auth.signInWithPopup(provider)
        .then(({user}) => {
            dispatch(login({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            }))
        })
        .catch(error => alert(error.message))
    }
    return (
        <div>
            <button className="login" style={{ backgroundColor: 'pink' }} onClick={login}>Login</button>
        </div>
    )
}

export default Login
