import React from 'react'
import Avatar from './Avatar'

const UserSearchCard = ({ user }) => {
    return (
        <div className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-primary rounded cursor-pointer'>
            <div>
                <Avatar
                    width={50}
                    height={50}
                    name={user?.name}
                    imageUrl={user?.profile_pic}
                />
            </div>
            <div>
                <p className='text-ellipsis line-clamp-1 font-semibold'>{user?.name}</p>
                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
            </div>
        </div>
    )
}

export default UserSearchCard