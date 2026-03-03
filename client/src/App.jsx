import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header/Header'

function App() {


  return (
    <>
    <Toaster position='top-center'
    reverseOrder = {false}/>
    <Header />
    <Outlet />
    </>
  )
}

export default App
