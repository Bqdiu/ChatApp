import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { HiUserCircle } from "react-icons/hi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      if (response.data.success) {
        setData({
          email: '',
        })
        // send user data to check password page
        navigate('/password',{
          state: response?.data?.data
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error)
    }
  }
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-5 mx-auto'>
        <div className='w-fit mx-auto'>
          <HiUserCircle
            size={80}
          />
        </div>
        <h3 className='text-center'>Welcome to Chat App</h3>

        <form className='gird gap-4 mt-3' onSubmit={handleSubmit}>
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
          <div className='flex justify-center items-center mt-5'>
            <button className='bg-primary w-full text-lg text-white px-4 py-1 rounded hover:bg-secondary leading-relaxed font-bold tracking-wide'>
              Let's go
            </button>
          </div>
        </form>
        <p className='my-3 text-center'>Do not have an account ? <Link to={"/register"} className='hover:text-primary font-semibold '>Register</Link></p>
      </div>
    </div>
  )
}

export default CheckEmailPage