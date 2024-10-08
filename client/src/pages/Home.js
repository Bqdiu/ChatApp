import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import logo from '../assets/logo.png'
import io from 'socket.io-client'

const Home = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log('redux user', user);
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-detail`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate('/email');
      }

      console.log('Current user details', response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  // socket connection

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    })

    socketConnection.on('onlineUser', (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    })

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    }
  }, [])

  const basePath = location.pathname === '/';
  return (
    <div className='grid lg:grid-cols-[320px,1fr] h-screen max-h-screen'>
      <section className={`bg-slate-100 ${!basePath && 'hidden'} lg:block`}>
        <SideBar />
      </section>
      {/* message component */}
      <section className={`${basePath && 'hidden'}`}>
        <Outlet />
      </section>
      {
        basePath && (
          <div className={`lg:flex justify-center items-center flex-col gap-3 hidden`}>
            <img
              src={logo}
              width={250}
              alt='Logo'
            />
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
          </div>
        )
      }


    </div>
  )
}

export default Home