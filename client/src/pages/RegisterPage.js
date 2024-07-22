import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom'
import uploadFile from '../helper/upLoadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })

  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();
  const handleOnchange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
  }

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let newData = { ...data }; // Tạo biến tạm thời để lưu giá trị mới nhất của state

    if (uploadPhoto) {
      const upload = await uploadFile(uploadPhoto);
      newData.profile_pic = upload?.url; // Cập nhật biến tạm thời với URL hình ảnh mới
    }
    console.log(newData);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    try {
      const response = await axios.post(URL, newData);
      console.log('response',response);
      toast.success(response.data.message);
      if(response.data.success){
        setData({
          name: '',
          email: '',
          password: '',
          profile_pic: ''
        })
        navigate('/email');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error)
    }
  }
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-5 mx-auto'>
        <h3 className='text-center'>Welcome to Chat App</h3>
        <form className='gird gap-4 pt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name: </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleOnchange}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleOnchange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnchange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Photo:
              <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : 'Upload your photo'
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-green-600' onClick={handleClearUploadPhoto}>
                      <IoClose />
                    </button>
                  )
                }

              </div>
            </label>
            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
            />
          </div>
          <div className='flex justify-center items-center mt-5'>
            <button className='bg-primary w-full text-lg text-white px-4 py-1 rounded hover:bg-secondary leading-relaxed font-bold tracking-wide'>Register</button>
          </div>
        </form>
        <p className='my-3 text-center'>Already have accout? <Link to={"/email"} className='hover:text-primary font-semibold '>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage