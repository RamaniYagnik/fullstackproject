import React from 'react'
import CategoryList from '../../component/CategoryList/CategoryList'
import HomeCrousel from './HomeCrousel/HomeCrousel'
import HomeSection from './homesection/HomeSection'
import HorizontalCardProduct from '../../component/HorizontalCardProduct/horizontalCardProduct'
import Shopbybrands from '../../component/shopbybrands/Shopbybrands'
import Movementinquartz from '../../component/movementinquartz/Movementinquartz'

const Home = () => {
  return (
    <div className=''>
      <HomeCrousel/>
      <HomeSection/>
      <CategoryList/>
      <HorizontalCardProduct category={'women'} heading={"BestSellers"} />
      <Shopbybrands  heading={"Shop By Brands"} />
      <Movementinquartz heading={"Movement In Quartz"} />
    </div>
  )
}

export default Home
