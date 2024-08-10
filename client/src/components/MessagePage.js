import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoMdImage } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import uploadFile from '../helper/upLoadFile';
import { CgCloseR } from "react-icons/cg";
import Loading from './Loading';
import backgroundImage from '../assets/wallapaper.jpeg'
const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(state => state?.user?.socketConnection);
  const user = useSelector(state => state?.user);
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    profile_pic: '',
    _id: '',
    online: false
  });
  const [loading, setLoading] = useState(false);

  console.log("params", params.userId);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);
      socketConnection.on('message-user', (data) => {
        console.log('User detail', data);
        setDataUser(data);
      })
    }
  }, [socketConnection, params?.userId, user])

  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  const handleOpenUploadFile = () => {
    setOpenUploadFile(preve => !preve)
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenUploadFile(false);
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url
      }
    })
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);
    setOpenUploadFile(false);
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: uploadVideo.url
      }
    })
  }

  const handleClearUploadImage = () => {
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: ""
      }
    })
  }

  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: ""
      }
    })
  }
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className='bg-no-repeat bg-cover'>
      <header className='relative top-0 h-16 bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-3'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-bold text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='text-sm'>
              {
                dataUser.online ? <span className='text-green-600'>Online</span> : <span className='text-slate-500'>Offline</span>
              }
            </p>
          </div>
        </div>
        <div>
          <button className='cursor-pointer hover:text-primary'>
            <BsThreeDotsVertical />
          </button>
        </div>

      </header>

      {/* show all message */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar bg-slate-100 bg-opacity-50'>

        {/* upload image display */}
        {
          message.imageUrl && (
            <div className='sticky bottom-0 bg-slate-700 bg-opacity-30 w-full h-full flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit absolute top-0 right-0 p-2 hover:text-primary' onClick={handleClearUploadImage}>
                <CgCloseR />
              </div>
              <div className='bg-white p-3'>
                <img
                  src={message.imageUrl}
                  alt='uploadImage'
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }
        {/* upload video display */}
        {
          message.videoUrl && (
            <div className='sticky bottom-0 bg-slate-700 bg-opacity-30 w-full h-full flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit absolute top-0 right-0 p-2 hover:text-primary' onClick={handleClearUploadVideo}>
                <CgCloseR />
              </div>
              <div className='bg-white p-3'>
                <video
                  src={message.videoUrl}
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  controls
                  muted
                  autoPlay
                />
              </div>
            </div>
          )
        }
        {
          loading && (
            <div className='w-full h-full flex justify-center items-center'>
              <Loading />
            </div>
          )
        }
      </section>
      {/* show all message */}
      <section className='h-16 bg-white flex items-center px-2'>
        <div className=' relative'>
          <button onClick={handleOpenUploadFile} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
            <FaPlus size={20} />
          </button>
          {/* upload image, file, ... */}
          {
            openUploadFile && (
              <div className='bg-white shadow rounded absolute bottom-12 w-36 p-2'>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center gap-2 p-2 px-4 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-primary'>
                      <IoMdImage size={18} />
                    </div>
                    <p>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center gap-2 p-2 px-4 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-purple-500'>
                      <FaVideo size={18} />
                    </div>
                    <p>Image</p>
                  </label>

                  <input
                    type='file'
                    id='uploadImage'
                    onChange={handleUploadImage}
                    className='hidden'
                  />

                  <input
                    type='file'
                    id='uploadVideo'
                    onChange={handleUploadVideo}
                    className='hidden'
                  />
                </form>
              </div>
            )
          }
        </div>

        <div className='w-full h-full'>
          <input
            type='text'
            placeholder='Type in here ...'
            className='w-full h-full outline-none px-4 py-1'
          />
        </div>

      </section>
    </div>
  )

}

export default MessagePage