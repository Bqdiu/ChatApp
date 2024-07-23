import React, { useEffect, useState } from 'react'
import Avatar from './Avatar';

const EditUserDetails = ({ onClose, user }) => {
    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic
    })

    console.log('user edit', user);

    useEffect(() => {
        setData(preve => {
            return {
                ...preve,
                ...user
            }
        })
    }, [user])

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
            <div className='bg-white p-4 py-5 m-1 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm'>Edit User Details</p>
                <form className='grid gap-3 mt-3'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={data.name}
                            onChange={onHandleChange}
                            className='w-full px-2 py-1 focus:outline-primary border-0.5'
                        />
                    </div>
                    <div>
                        <label htmlFor='profile_pic'>Photo</label>
                        <div className='my-1 flex items-center gap-5'>
                            <Avatar
                                width={40}
                                height={40}
                                imageUrl={data.profile_pic}
                                name={data.name}
                            />
                            <button className='font-semibold'>Upload your avatar</button>
                        </div>
                    </div>
                    <div className='flex gap-2 w-fit ml-auto mt-3'>
                        <button className='border border-primary text-primary px-4 py-1 rounded'>Cancel</button>
                        <button className='border border-primary bg-primary text-white px-4 py-1 rounded'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails)