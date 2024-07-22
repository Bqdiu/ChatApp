import axios from 'axios';
import React, { useEffect } from 'react'

const Home = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-detail`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });
      console.log('Current user details', response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home