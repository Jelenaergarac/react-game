import React, { useEffect, useState } from 'react'
import Cat1 from '../cats/cat1.png'
import Cat2 from '../cats/cat2.png'
import Cat3 from '../cats/cat3.png'
import Cat4 from '../cats/cat4.png'
import Cat5 from '../cats/cat5.png'
import Cat6 from '../cats/cat6.png'
import blank from '../cats/blank.png'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'
import { selectUser } from '../features/userSlice'
const catsFamily = [
 Cat1, Cat2, Cat3, Cat4, Cat5, Cat6
]

const width = 8

const Game = () => {
   

    const [currentMember, setCurrentMember] = useState([])
    const [fieldBeingDragged, setFieldBeingDragged] = useState(null)
    const [fieldBeingReplaced, setFieldBeingReplaced] = useState(null)
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(0)

    //create board and moving down

    const createBoard = () => {
        const randomField = []
        for(let i =  0; i < width * width; i++){
            const randomNumber0To5 = Math.floor(Math.random() * catsFamily.length)
            const randomMember = catsFamily[randomNumber0To5]
            randomField.push(randomMember)
        }
        setCurrentMember(randomField)
    }

    useEffect(() => {
     createBoard()
    },[])

    const moveDown = () => {
        for(let i = 0; i <= 55; i++){
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)

            if(isFirstRow && currentMember[i] === blank){
                let randomNumber = Math.floor(Math.random() * catsFamily.length)
                currentMember[i] = catsFamily[randomNumber]

            }
            if((currentMember[i + width]) === blank){
                currentMember[i + width] = currentMember[i]
                currentMember[i] = blank
            }
        }
    }

    //drag, drop and stuff
    const dragStart = (e) => {
    setFieldBeingDragged(e.target)


    }
    const dragDrop = (e) => {
        setFieldBeingReplaced(e.target)

    }
    const dragEnd = () => {
     const fieldBeingDraggedID = parseInt(fieldBeingDragged.getAttribute('data-id'))
     const fieldBeingReplacedID = parseInt(fieldBeingReplaced.getAttribute('data-id'))

     currentMember[fieldBeingReplacedID] = fieldBeingDragged.getAttribute('src')
     currentMember[fieldBeingDraggedID] = fieldBeingReplaced.getAttribute('src')
     
     const rightMoves = [
         fieldBeingDraggedID - 1,
         fieldBeingDraggedID - width,
         fieldBeingDraggedID + 1, 
         fieldBeingDraggedID + width
     ]
     const rightMove = rightMoves.includes(fieldBeingReplacedID)

      if(fieldBeingReplacedID && rightMove ){
            setFieldBeingDragged(null)
            setFieldBeingReplaced(null)
        }else {
            currentMember[fieldBeingReplacedID] = fieldBeingReplaced.getAttribute('src')
            currentMember[fieldBeingDraggedID] = fieldBeingDragged.getAttribute('src')

        }
    }

    //matches

    const fourColumnMembers = () => {
        for(let i = 0; i <=39; i++){
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const choosenMember = currentMember[i]
            const isBlank = currentMember[i] === blank

            if(columnOfFour.every(square => currentMember[square] === choosenMember && !isBlank)){
                setScore((score) => score + 4)
                columnOfFour.forEach(square => currentMember[square] = blank)
                return true
            }
        }
    }
    const fourRowMembers = () => {
        for(let i = 0; i < 64; i++){
            const rowOfFour = [i, i+1, i+2, i+3]
            const choosenMember = currentMember[i]
            const isBlank = currentMember[i] === blank
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            if(notValid.includes[i]) continue

            if(rowOfFour.every(square => currentMember[square] == choosenMember && !isBlank)){
                setScore((score) => score + 4)

                rowOfFour.forEach(square => currentMember[square] = blank)
                return true
            }
        }
    }

    const threeColumnsMember = () => {
        for(let i = 0; i <=47; i++){
            const columnOfThree = [i, i+width, i + width*2]
            const choosenMember = currentMember[i]
            const isBlank = currentMember[i] === blank

            if(columnOfThree.every(square => currentMember[square] === choosenMember && !isBlank)){
                setScore((score) => score + 3)
                columnOfThree.forEach(square => currentMember[square] = blank)
                return true
            }
        }
    }
    const threeRowsMember = () => {
        for(let i = 0; i < 64; i++){
            const rowOfThree = [i,i+1,i+2]
            const choosenMember = currentMember[i]
            const isBlank = currentMember[i] === blank
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            if(notValid.includes(i)) continue

            if(rowOfThree.every(square => currentMember[square] === choosenMember && !isBlank)){
                setScore((score) => score + 3)

                rowOfThree.forEach(square => currentMember[square] = blank)
                return true
            }
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
            fourColumnMembers()
            fourRowMembers()
            threeColumnsMember()
            threeRowsMember()
            moveDown()

            setCurrentMember([...currentMember])
        },100)
        return () => clearInterval(timer)


    }, [fourColumnMembers,fourRowMembers,threeColumnsMember,threeRowsMember,moveDown,currentMember
        ])



    return (
      
        <div className="container">
       
           <h2 className="score">Score: {score}</h2>
              
          <div className="game">
       
        
        {currentMember.map((catMember, index) => (
          <img
          key={index}
          src={catMember}
          style={{ backGroundColor: catMember }}
          alt={catMember}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
        />  
        ))}
 </div> 
 </div>
     
    )
}

export default Game
