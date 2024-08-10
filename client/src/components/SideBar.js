import React, { useState } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import { IoLogOut } from "react-icons/io5";
import Avatar from './Avatar'
import { useSelector } from 'react-redux'
import EditUserDetails from './EditUserDetails';
import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from './SearchUser';

const SideBar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [searchUserOpen, setSearchUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr]'>
            <div className='bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between'>
                <div>
                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-600 ${isActive && 'bg-slate-300'}`} title='Chat'>
                        <IoChatbubbleEllipsesSharp
                            size={25}
                        />
                    </NavLink>
                    <div title='Add friend' onClick={() => setSearchUserOpen(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-700'>
                        <FaUserPlus
                            size={25}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='mx-auto cursor-pointer' title={user.name} onClick={() => setEditUserOpen(true)}>
                        <Avatar
                            width={35}
                            height={35}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
                        />
                    </div>
                    <button title='Logout' className='w-12 h-12 mt-1 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-700'>
                        <IoLogOut
                            size={25}
                        />
                    </button>
                </div>
            </div>

            <div className='w-full bg-white'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-semibold p-4'>Message</h2>
                </div>
                <div className='bg-slate-300 p-[0.5px]'></div>
                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length === 0 && (
                            <div className='mt-10'>
                                <div className='flex justify-center items-center m-1 text-slate-500'>
                                    <GoArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <div>
                                    <p className='text-center text-slate-500'>Explore users to start a conversation with.</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


            {/* Edit user details */}
            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
                )
            }

            {/* Search user */}
            {
                searchUserOpen && (
                    <SearchUser onClose={() => setSearchUserOpen(false)} />
                )
            }
        </div>
    )
}

export default SideBar