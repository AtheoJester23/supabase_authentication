import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './state/store'
import { supabase } from './supabaseClient'
import { setSession } from './state/Session/sessionSlice'
import Update from './pages/Update'
import Create from './pages/Create'
import PageNotFound from './pages/PageNotFound'
import Item from './pages/Item'

function App() {
  const dispatch = useDispatch<AppDispatch>()
    
  useEffect(() => {
      const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
          dispatch(setSession(session))
      })

      return () => subscription.unsubscribe();
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Dashboard'  element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/:id' element={<Item/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
