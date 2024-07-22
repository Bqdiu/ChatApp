import React from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";

const SideBar = () => {
    return (
        <div className='w-full h-full'>
            <div className='bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5'>
                <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-600' title='Chat'>
                    <IoChatbubbleEllipsesSharp
                        size={25}
                    />
                </div>
                <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-700'>
                    <FaUserPlus 
                        size={25}
                    />
                </div>
            </div>
        </div>
    )
}

export default SideBar