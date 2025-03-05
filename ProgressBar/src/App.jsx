import './App.css'
import { useState } from 'react'
import ProgressBar from './progressbar.jsx'

function App() {
  const [progress, setProgress] = useState(30);

  const updateProgress = () => {
    if(progress<100){
      setProgress(progress+10);
    }
  }

  return (
    <div>
      <ProgressBar progress={progress}/>
      <button onClick={updateProgress}> Increase Progress </button>
      <button onClick={()=>{
        if(progress>0){
          setProgress(progress-10);
        }
      }}> Decrease Progress </button>
    </div>
  )
}

export default App
