import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
  })

  const navigate = useNavigate();
  const location = useLocation();
  // console.log('location', location);
  const dispatch = useDispatch();
  // redirect if email has not been entered
  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, [])

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      });
      
      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token);
        setData({
          password: '',
        })
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error)
    }
  }
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-5 mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar
            width={80}
            height={80}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>

        <form className='gird gap-4 mt-3' onSubmit={handleSubmit}>
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
          <div className='flex justify-center items-center mt-5'>
            <button className='bg-primary w-full text-lg text-white px-4 py-1 rounded hover:bg-secondary leading-relaxed font-bold tracking-wide'>
              Login
            </button>
          </div>
        </form>
        <p className='my-3 text-center'>
          <Link to={"/forgot-password"} className='hover:text-primary font-semibold '>Forgot password ?</Link>
        </p>
      </div>
    </div>
  )
}

export default CheckPasswordPage
