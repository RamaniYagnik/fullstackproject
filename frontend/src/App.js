import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import BackendApi from './APIs/BackendApi.js'
import Context from './context/context.js'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice.js'
import './App.css'
import ScrollToTop from './component/Scrolltotop/Scrolltotop.js'

const App = () => {

  const dispatch = useDispatch()
  const [ cartProductCount, setCartProductCount ] = useState(0)
  const [ wishlistCount, setWishlistCount ] = useState(0)

  const fetchUserDetail = async () => {
    const response = await fetch(BackendApi.current_user.url, {
      method: BackendApi.current_user.method,
      credentials: "include"
    });

    const dataApi = await response.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  
  };

  const fetchAddTocart = async() => {
    const response = await fetch(BackendApi.getCount.url, {
      method: BackendApi.getCount.method,
      credentials: "include"
    });

    const dataApi = await response.json();

    setCartProductCount(dataApi?.data?.count || 0)
    
  }

  const fetchWishlist = async() => {
    const response = await fetch(BackendApi.getWishlistCount.url, {
      method: BackendApi.getWishlistCount.method,
      credentials: "include"
    });

    const dataApi = await response.json();

    setWishlistCount(dataApi?.data?.count || 0)
    
  }

  useEffect(() => {

    fetchUserDetail()
    fetchAddTocart()
    fetchWishlist()
  },[])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetail,
        cartProductCount,
        fetchAddTocart,
        setCartProductCount,
        wishlistCount,
        fetchWishlist,
        setWishlistCount
      }}>
        <ScrollToTop/>
        <ToastContainer position='top-center' autoClose={2000} />
        <Header />
        <main className='min-h-[calc(100vh-100px)] mt-[135px]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
