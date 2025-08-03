import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from '../AdminEditProduct/AdminEditProduct';
import displayINRcurrency from '../../../helpers/DisplayCurrency';

const AdminPanelProductCard = ({
    data,
    fetchData
}) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div>
            <div className='bg-slate-100 p-4 rounded-2xl'>
                <img src={data?.productImage[0]} width={300} height={400} alt='' />
                <h2 className='text-xs my-2'>{data?.productName}</h2>
                <div>

                    <div>
                        {
                            displayINRcurrency(data.sellingPrice) 
                        }
                    </div>

                    <div className='w-fit ml-auto p-2 bg-yellow-600 hover:bg-yellow-700 hover:text-white transition-all rounded-full' onClick={() => setEditProduct(true)}>
                        <MdEdit />
                    </div>
                
                </div>
                {
                    editProduct && (
                        <AdminEditProduct data={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                    )
                }
            </div>
        </div>
    )
}

export default AdminPanelProductCard
