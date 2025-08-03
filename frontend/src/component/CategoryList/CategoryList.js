import React, { useEffect, useState } from 'react'
import Api from '../../APIs/BackendApi'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(10).fill(null)

    const allowedCategories = ['sales', 'bestseller', 'men', 'women', 'kids', 'couple', 'raga', 'luxe', 'clocks', 'smartwatches']

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(Api.category.url)
        const dataResponse = await response.json()
        setLoading(false)

        const filteredData = dataResponse.data.filter(product =>
            allowedCategories.includes(product.category)
        )
        setCategoryProduct(filteredData)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container mx-auto p-4 overflow-x-hidden my-5'>
            <div className='flex items-center justify-between overflow-x-scroll scrollbarnone'>
                {
                    loading ? (
                        categoryLoading.map((p, index) => {
                            return (
                                <div className='h-16 w-16 md:h-20 rounded-full overflow-hidden bg-slate-300' key={index}></div>
                            )
                        })
                    ) : (
                        categoryProduct.map((product, index) => (
                            <Link to={"/productcategory?category=" + product?.category} key={index} className='text-center m-2 cursor-pointer '>
                                <div className='overflow-hidden rounded-full w-36 h-32 mx-auto'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down hover:scale-125 transition-all mix-blend-multiply bg-white p-2 rounded-full' />
                                </div>
                                <p className='mt-2 capitalize'>{product?.category}</p>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList
