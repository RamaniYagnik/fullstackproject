import React from 'react'
import ROLE from '../../APIs/Role'
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import Api from '../../APIs/BackendApi';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    userId, name, email, role, onClose, callfunc
}) => {

    const [ userRole, setUserRole ] = useState(role)

    const handleChange = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async () => {
        try {
          const fetchResponse = await fetch(Api.updateUser.url, {
            method: Api.updateUser.method,
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              role: userRole,
              userId: userId
            })
          });
      
          const responseData = await fetchResponse.json();
      
          if (responseData.success) {
            toast.success("User role updated successfully");
            callfunc();
            onClose();
          } else {
            toast.error(responseData.message || "Failed to update role");
          }
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong");
        }
      };
      

    return (
        <div className='fixed lg:top-[270px] md:top-[180px] h-full z-10 lg:left-[500px] md:left-[240px]'>
            <div className='bg-white px-10 py-5 shadow-2xl rounded-2xl'>

                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose/>
                </button>

                <h1 className='py-2 text-lg font-medium'>Change User Role</h1>

                <p className='py-2'>Name :- {name}</p>
                <p className=''>Email :- {email}</p>

                <div className='flex items-center justify-between py-3'>
                    <p className='pe-4'>Role :- </p>
                    <select className='border transition-all px-4 py-2' value={userRole} onChange={handleChange}>
                        {
                            Object.values(ROLE).map(p => {
                                return (
                                    <option value={p} key={p} >{p}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='block mx-auto bg-yellow-200 rounded-full py-2 px-6 hover:bg-yellow-300 transition-all my-3' onClick={updateUserRole}>Change Role</button>

            </div>
        </div>
    )
}

export default ChangeUserRole
