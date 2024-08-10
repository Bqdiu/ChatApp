import React from 'react'
import { TbUser } from "react-icons/tb";
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser);
    let avatarName = '';

    if (name) {
        const splitName = name?.split(" ");
        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = [
        'bg-slate-400',
        'bg-teal-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-secondary',
    ]

    const randomNumber = Math.floor(Math.random() * 5)

    const isOnline = onlineUser.includes(userId);
    return (
        <div className={`text-slate-800 overflow-hidden rounded-full font-bold relative`} style={{ width: width + 'px', height: height + 'px' }}>
            {
                imageUrl ? (
                    <img
                        src={imageUrl}
                        height={height}
                        width={width}
                        alt={name}
                        className='overflow-hidden rounded-full'
                    />
                ) : (
                    name ? (
                        <div style={{ width: width + 'px', height: height + 'px' }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (
                        <TbUser
                            size={width}
                        />
                    )
                )
            }
            {
                isOnline && (
                    <div className='bg-green-500 p-1 rounded-full absolute bottom-0.5 right-1.5 z-10'> </div>
                )
            }

        </div>

    )
}

export default Avatar