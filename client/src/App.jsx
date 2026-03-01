import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Toaster position='top-center'
    reverseOrder = {false}/>

    <Outlet />
    </>
  )
}

export default App
