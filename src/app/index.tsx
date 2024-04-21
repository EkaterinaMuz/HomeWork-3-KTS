import * as React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom'
import Router from '../pages'

function App() {
  return (
    <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e4e4e4">
      <RouterProvider router={Router} />
    </SkeletonTheme>

  )
}

export default App
