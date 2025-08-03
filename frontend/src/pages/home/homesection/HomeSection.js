import React from 'react'
import bn7 from '../../../Frontend-Images/banner/bn7.webp'
import bn8 from '../../../Frontend-Images/banner/bn8.webp'
import bn9 from '../../../Frontend-Images/banner/bn9.webp'

const HomeSection = () => {
    return (
        <div>

            <div className='flex justify-center items-center'>
                <div className="md:my-10 my-5">
                    <img src={bn7} alt="" className='w-[1350px]' />
                </div>
            </div>

            <div className='flex flex-wrap'>
                <div className='md:w-1/2 w-full'>
                    <div className='flex justify-end'>
                        <div className='md:me-5 m-5'>
                            <img src={bn8} alt='' className='w-[650px]' />
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2 w-full'>
                    <div className='flex justify-start'>
                        <div className='md:ms-5 m-5'>
                            <img src={bn9} alt='' className='w-[650px]' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeSection
