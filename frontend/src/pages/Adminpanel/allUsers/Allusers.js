import React from 'react'
import { useState, useEffect } from 'react';
import Api from '../../../APIs/BackendApi';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../../../component/changeuserRole/ChangeUserRole';

const Allusers = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [ updateUserPopup, setUpdateUserpopup ] = useState(false)
  const [ updateUser, setUpdateUser ] = useState({
    _id: "",
    name: "",
    email: "",
    role: ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(Api.allusers.url, {
      method: Api.allusers.method,
      credentials: 'include'
    })

    const dataresponse = await fetchData.json()

    if (dataresponse.success) {
      setAllUsers(dataresponse.data)
    }

    if (dataresponse.error) {
      toast.error(dataresponse.message)
    }

  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className=''>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((p, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{p?.name}</td>
                  <td>{p?.email}</td>
                  <td>{p?.role}</td>
                  <td>{moment(p?.createdAt).format('LLL')}</td>
                  <td>
                    <button className='bg-yellow-100 p-1 rounded-full cursor-pointer hover:bg-yellow-200 transition-all' onClick={() => {
                      setUpdateUser(p) 
                      setUpdateUserpopup(true)
                    }}>
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        updateUserPopup && (
          <ChangeUserRole 
            onClose={() => setUpdateUserpopup(false)} 
            userId={updateUser._id}
            name={updateUser.name} 
            email={updateUser.email}
            role={updateUser.role}
            callfunc={fetchAllUsers}  
          />
        )
      }

    </div>
  )
}

export default Allusers
