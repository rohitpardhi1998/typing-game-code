import React, { useState, useEffect ,useRef} from "react"


function App() {
const STARTING_TIME = 60
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    

  function handleChange(event) {
    const { value } = event.target
    setText(value)
  }
  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ")
    console.log(wordsArr.length)
    return wordsArr.filter(word => word !== "").length
  }


  function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(STARTING_TIME)
    setText("")
     textBoxRef.current.disabled = false
        textBoxRef.current.focus()
  }

 function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
     endGame()  // eslint-disable-line react-hooks/exhaustive-deps
   
      
    }
  }, [timeRemaining, isTimeRunning]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
         ref={textBoxRef}
        onChange={handleChange}
         placeholder="Test Your Typing Speed Here"

        value={text}
        disabled={!isTimeRunning}
      />

      <h4> Time Remaining;  {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning} >Start Game</button>
      <h1>Word Count is:{wordCount}</h1>
    </div>
  )
}

export default App
