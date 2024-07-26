import React, { useState } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import { IoLogOut } from "react-icons/io5";
import Avatar from './Avatar'
import { useSelector } from 'react-redux'
import EditUserDetails from './EditUserDetails';

const SideBar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    return (
        <div className='w-full h-full'>
            <div className='bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between'>
                <div>
                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-600 ${isActive && 'bg-slate-300'}`} title='Chat'>
                        <IoChatbubbleEllipsesSharp
                            size={25}
                        />
                    </NavLink>
                    <div title='Add friend' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-700'>
                        <FaUserPlus
                            size={25}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='mx-auto cursor-pointer' title={user.name} onClick={() => setEditUserOpen(true)}>
                        <Avatar
                            width={40}
                            height={40}
                            name={user.name}
                            imageUrl={user.profile_pic}
                        />
                    </div>
                    <button title='Logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-700'>
                        <IoLogOut
                            size={25}
                        />
                    </button>
                </div>
            </div>

            {/* Edit user details */}
            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
                )
            }
        </div>
    )
}

export default SideBar