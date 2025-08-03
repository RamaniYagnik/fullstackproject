import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Ad from '../../Frontend-Images/Admin-image/ad.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../../APIs/Role'

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
      if(user?.role !== ROLE.ADMIN){
        navigate("/")
      }
    },[user,navigate])

  return (
    <div className='min-h-[calc(100vh-120px)] lg:mt-[136px] md:mt-[80px] md:flex hidden'>
      <aside className='bg-slate-100 min-h-full w-full lg:max-w-96 md:max-w-52 customshadow'>
        <div className='h-56 flex justify-center items-center flex-col'>
            <div className='flex justify-center'>
                <img src={Ad} alt='' className='w-24' />
            </div>
            <p className='font-semibold my-1 text-sm'>Email :- { user?.email }</p>
            <p className='font-semibold my-1 text-sm capitalize'>Name :- { user?.name }</p>
            <p  className='font-semibold my-1 text-sm'>Role :- { user?.role }</p>
        </div>
        <div>
            <nav className='grid p-4'>
                <Link to={'alluser'} className='p-2 hover:bg-slate-200 transition-all' >All-Users</Link>
                <Link to={'allproducts'} className='p-2 hover:bg-slate-200 transition-all' >All-Products</Link>
                <Link to={'allorders'} className='p-2 hover:bg-slate-200 transition-all' >All-Orders</Link>
            </nav>
        </div>
      </aside>
      <main className='p-4 h-full w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel