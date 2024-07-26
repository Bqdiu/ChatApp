import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar';
import Divider from './Divider';
import uploadFile from '../helper/upLoadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice';

const EditUserDetails = ({ onClose, user }) => {
    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic
    })

    const uploadPhotoRef = useRef();
    const [uploadPhoto, setUploadPhoto] = useState("");
    const dispatch = useDispatch();
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
    const handleOpenUploadPhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadPhotoRef.current.click();
    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];
        // const uploadPhoto = await uploadFile(file);
        const localUrl = URL.createObjectURL(file);
        setData((preve) => {
            return {
                ...preve,
                profile_pic: localUrl
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let newData = {...data};

        try {
            // Upload photo if a file is selected
          if(uploadPhotoRef.current.files.length > 0){
            const file = uploadPhotoRef.current.files[0];
            const uploadPhoto = await uploadFile(file);
            newData.profile_pic = uploadPhoto?.url;
          }
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user-detail`;
            const response = await axios({
                method: 'post',
                url: URL,
                data: newData,
                withCredentials: true
            });
            toast.success(response?.data?.message);
            if (response.data.success) {
                dispatch(setUser(response.data.data));
                onClose();
            }
        } catch (error) {
            console.log(error)
            toast.error();
        }
    }



    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
            <div className='bg-white p-4 py-5 m-1 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm'>Edit User Details</p>
                <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
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
                        <div>Photo</div>
                        <div className='my-1 flex items-center gap-5'>
                            <Avatar
                                width={40}
                                height={40}
                                imageUrl={data.profile_pic}
                                name={data.name}
                            />
                            <label htmlFor='profile_pic'>
                                <button className='font-semibold' onClick={handleOpenUploadPhoto}>Upload your avatar</button>
                                <input
                                    type='file'
                                    id='profile_pic'
                                    className='hidden'
                                    onChange={handleUploadPhoto}
                                    ref={uploadPhotoRef}
                                />
                            </label>
                        </div>
                    </div>
                    <Divider />
                    <div className='flex gap-2 w-fit ml-auto'>
                        <button onClick={onClose} className='border border-primary text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                        <button onClick={handleSubmit} className='border border-primary bg-primary text-white px-4 py-1 rounded hover:bg-secondary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails)