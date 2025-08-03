import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import VerticalCardProduct from '../../component/VerticalProductCard/VerticalProductCard'
import productCategory from '../../helpers/productCategory'
import Api from '../../APIs/BackendApi'

const CategoryProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const selectedCategoryFromUrl = searchParams.get("category")

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectCategory, setSelectCategory] = useState({})
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const isFirstLoad = useRef(true)

  const [sortBy, setSortBy] = useState("")

  const handleOnChangeSortBy = async (e) => {

    const { value } = e.target
  
    setSortBy(value)

    if (value === 'asc') {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === 'dsc') {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
    
  }

  // Parse selected categories from URL on first load
  useEffect(() => {
    if (selectedCategoryFromUrl) {
      const categoriesFromUrl = selectedCategoryFromUrl.split(',')
      const categoryObj = {}
      categoriesFromUrl.forEach(cat => categoryObj[cat] = true)
      setSelectCategory(categoryObj)
    }
  }, [selectedCategoryFromUrl])

  // Sync checkbox state to filterCategoryList
  useEffect(() => {
    const selected = Object.keys(selectCategory).filter(key => selectCategory[key])
    setFilterCategoryList(selected)
  }, [selectCategory])

  // Fetch filtered data whenever filterCategoryList updates
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(Api.filterProduct.url, {
        method: Api.filterProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: filterCategoryList })
      })
      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
      setLoading(false)
    }

    fetchData()
  }, [filterCategoryList])

  // Update URL (after first load only)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    const query = new URLSearchParams()
    if (filterCategoryList.length > 0) {
      query.set('category', filterCategoryList.join(','))
    }

    const url = query.toString() ? `/productcategory?${query.toString()}` : '/productcategory'
    navigate(url, { replace: true })

  }, [filterCategoryList, navigate])

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory(prev => ({
      ...prev,
      [value]: checked
    }))
  }

  useEffect(() => {

  },[sortBy])

  return (
    <div className='p-5'>
      <div className='lg:grid grid-cols-[200px,1fr]'>

        <div className='md:block hidden bg-white p-2 h-[calc(100vh-120px)] sticky top-[150px] overflow-y-auto scrollbarnone'>
          <div>
            <h3 className='text-center uppercase font-medium text-slate-600 border-b pb-1'>SORT By</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' id='lowToHigh' name='sortby' value={'asc'} onChange={handleOnChangeSortBy} checked={sortBy === 'asc'} />
                <label htmlFor='lowToHigh'>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' id='highToLow' name='sortby' value={'dsc'} onChange={handleOnChangeSortBy} checked={sortBy === 'dsc'} />
                <label htmlFor='highToLow'>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div>
            <h3 className='text-center capitalize font-medium text-slate-600 border-y pb-1'>categories</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((category, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='checkbox'
                    id={category.value}
                    name='category'
                    value={category.value}
                    onChange={handleSelectCategory}
                    checked={selectCategory[category.value] || false}
                  />
                  <label htmlFor={category.value}>{category.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div className=''>
          {!loading && data.length > 0 && (
            <VerticalCardProduct products={data} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
