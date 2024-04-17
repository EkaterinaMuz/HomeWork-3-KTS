import * as React from 'react';
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from '../pages'

function App() {
  return (
    <RouterProvider router={Router} />
  )
}

export default App
