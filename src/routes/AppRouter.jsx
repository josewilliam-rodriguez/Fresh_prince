import React, { lazy, Suspense, useEffect, useState } from 'react'
import { AppContext } from '../context/userContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBarr from '../assets/components/NavBarr'
import ModalAddCollections from '../assets/components/ModalAddCollections'
import Private from './Private'

const Login = lazy(() => import('../assets/components/Login'))
const App = lazy(() => import('../App'))
const Register = lazy(() => import('../assets/components/Register'))
const Shop = lazy(() => import('../assets/components/Shop'))
const Collections = lazy(() => import('../assets/components/Collections'))
const Profile = lazy(() => import('../assets/components/Profile'))
const ShoppingCart = lazy(() => import('../assets/components/ShoppingCart'))
const ProducDetai = lazy(() => import('../assets/components/ProducDetai'))

const AppRouter = () => {
  const [autenticado, setAutenticado] = useState(false)
  const [context, setContext] = useState({})

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem('user'))
    if (userLoggedIn?.id) {
      setAutenticado(true)
       setContext(userLoggedIn)
    } else {
      setAutenticado(false)
    }
  }, [])
  return (
    
        <AppContext.Provider value={{ context, setContext }}>
          
        <BrowserRouter>
        <NavBarr/>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login setAutenticado={setAutenticado} />} />
            <Route path="/Registrar" element={<Register setAutenticado={setAutenticado} />} />
            <Route path="/Shop" element={<Shop/>} />
            <Route path="/Collections" element={<Collections/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/ShoppingCart" element={<ShoppingCart/>} />
            <Route path="/shop/:id" element={<ProducDetai/>} />
            <Route
              path="/admin/add-collection"
              element={
                <Private>
                  <ModalAddCollections />
                </Private>
              }
            />

        </Routes>
        </Suspense>
        </BrowserRouter>
        </AppContext.Provider>

    
  )
}

export default AppRouter