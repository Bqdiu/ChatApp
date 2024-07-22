import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../redux/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';

const Home = () => {

  const user = useSelector(state => state.user);
  console.log('redux user', user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-detail`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(response.data.data));

      if (response.data.logout) {
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
  return (
    <div className='grid lg:grid-cols-[320px,1fr] h-screen max-h-screen'>
      <section className='bg-slate-100'>
        <SideBar />
      </section>
      {/* message component */}
      <section className='bg-green-200'>
        <Outlet />
      </section>
    </div>
  )
}

export default Home