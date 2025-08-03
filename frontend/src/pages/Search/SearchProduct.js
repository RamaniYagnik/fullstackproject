import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../../APIs/BackendApi'
import VerticalCardProduct from '../../component/VerticalProductCard/VerticalProductCard'

const SearchProduct = () => {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(Api.SearchProduct.url + location.search)
        const dataResponse = await response.json()
        if (dataResponse.success) {
            setProducts(dataResponse.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [location])

    return (
        <div className="pt-24 px-4">

            {
                loading && (
                    <p className='text-center text-3xl italic font-semibold'>loading...</p>
                )
            }
            <h2 className="text-xl text-center font-semibold mb-4">Search Results : { products.length }</h2>

            {
                products.length === 0 && !loading && (
                    <p className="text-xl text-center font-semibold mb-4">No Data Found</p>
                )
            }

            {
                products.length !== 0 && !loading && (
                    <VerticalCardProduct products={products}/>
                )
            }

        </div>
    )
}

export default SearchProduct
