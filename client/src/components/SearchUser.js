import React, { useEffect, useState } from 'react'
import { BsSearchHeart } from "react-icons/bs";
import Loading from './Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import UserSearchCard from './UserSearchCard';
import { CgCloseR } from "react-icons/cg";

const SearchUser = ({ onClose }) => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState("");
    const handleSearchUser = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
        try {
            setLoading(true);
            const response = await axios.post(URL, {
                search: searchString
            });
            setLoading(false);
            setSearchUser(response.data.data);
        } catch (error) {
            toast(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        handleSearchUser();
    }, [searchString])

    console.log('searchUser', searchUser);
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 px-5 overflow-y-auto scrollbar z-10'>
            <div className='w-full max-w-lg mx-auto mt-12'>
                {/* imput search user */}
                <div className='bg-white rounded h-14 overflow-hidden flex'>
                    <input
                        type='text'
                        className='w-full h-full outline-none py-1 px-4'
                        placeholder='Search user by name, email ...'
                        onChange={(e) => setSearchString(e.target.value)}
                        value={searchString}
                    />
                    <div className='h-14 w-14 flex justify-center items-center'>
                        <BsSearchHeart
                            size={25}
                        />
                    </div>
                </div>
                {/* display search user */}
                <div className='bg-white w-full p-4 mt-3 rounded'>
                    {/*User not found*/}
                    {
                        searchUser.length === 0 && !loading && (
                            <p className='text-lg text-center text-slate-500'>User not found</p>
                        )
                    }
                    {
                        loading && (
                            <Loading />
                        )
                    }
                    {
                        searchUser.length !== 0 && !loading && (
                            searchUser.map((user, index) => (
                                <UserSearchCard key={user._id} user={user} onClose={onClose} />
                            ))
                        )
                    }
                </div>
            </div>
            <div className='text-2xl fixed top-0 right-10 p-3 lg:text-4xl hover:text-white' onClick={onClose}>
                <button>
                    <CgCloseR />
                </button>
            </div>
        </div>
    )
}

export default SearchUser