import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes/app.routes'
import useAuth from '../features/auth/hooks/useAuth'

const App = () => {
  let {fetchCurrentUser}=useAuth()
  useEffect(()=>{
      
      fetchCurrentUser()

  },[])
  return (
    <RouterProvider router={router} />

  )
}

export default App
