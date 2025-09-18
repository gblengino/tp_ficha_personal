import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import Form from './layouts/Form'
import Personas from './layouts/Personas'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/form' element={<Form />}/>
          <Route path='/personas' element={<Personas />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
