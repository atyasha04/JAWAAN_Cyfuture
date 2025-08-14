import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewDetails from "./components/ViewDetails"

function App() {
 

  return (

     
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/view-details" element={<ViewDetails />} />
    </Routes>
  </Router>


  )
}

export default App
