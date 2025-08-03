import React, { useEffect, useState } from 'react'
import Uploadproducts from '../../../component/uploadProducts/Uploadproducts'
import Api from '../../../APIs/BackendApi'
import AdminPanelProductCard from '../../../component/Admin/AdminPanelProductCard/AdminPanelProductCard'

const AllProducts = () => {

  const [openUploadProducts, setOpenUploadProducts] = useState(false)
  const [AllProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(Api.getproducts.url)
      if (!response.ok) throw new Error("Network response was not ok")
      
      const dataResponse = await response.json()
      setAllProducts([...dataResponse?.data])
    } catch (err) {
      console.error("Failed to fetch products:", err)
    }
  }
  

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>AllProducts</h2>
        <button className='border-2 border-yellow-600 text-yellow-600 py-1 px-3 rounded-full hover:bg-yellow-600 hover:text-white transition-all' onClick={() => setOpenUploadProducts(true)}>Upload Products</button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
        {
          AllProducts.map((product, index) => {
            return (
              <AdminPanelProductCard data={product} key={index} fetchData={fetchAllProducts} />
            )
          })
        }
      </div>

      {
        openUploadProducts && (
          <Uploadproducts onClose={() => setOpenUploadProducts(false)} fetchData={fetchAllProducts} />
        )
      }

    </div>
  )
}

export default AllProducts
