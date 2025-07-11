import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Grid from './components/Grid'
import ToDoBody from './components/ToDoBody'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Grid/>
      <Navbar/>
      <ToDoBody/>
    </div>
  )
}

export default App
