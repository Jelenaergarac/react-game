import { Avatar } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { auth } from '../firebase'
import {selectUser} from '../features/userSlice'

const Welcome = () => {
    
    const history = useHistory()

   
    return (
        <>
        <div className="page">
            
         <h1>Cat Game</h1>
        <button
        
        onClick={() => history.push('/game')} className="btn">Play Game</button>
        </div>
       
        </>
    )
}

export default Welcome
