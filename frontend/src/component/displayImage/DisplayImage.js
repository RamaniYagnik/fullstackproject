import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
  ImgUrl,
  onClose
}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
      <div className='bg-slate-200 shadow-sm rounded-2xl max-w-5xl mx-auto'>
        <div className='w-fit ml-auto cursor-pointer'>
          <button onClick={onClose} className='me-4 mt-4 border-2 border-slate-200 rounded-lg hover:text-yellow-600 hover:border-yellow-600 transition-all p-1'><IoMdClose /></button>
        </div>
        <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
          <img src={ImgUrl} className='w-full h-full' alt='' />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage
