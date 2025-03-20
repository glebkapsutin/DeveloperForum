import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { resetUser, selectCurrent } from '../../features/user/userSlice';
import { useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '../../app/services/userApi';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../app/services/followApi';
import { GoBack } from '../../components/go-back';
import { Box, Button, Card as MuiCard } from '@mui/material';
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from 'react-icons/md';
import { ProfileInfo } from '../../components/profile-info';
import {formatToClientDate} from '../../utils/format-to-client-date'
import { CiEdit } from 'react-icons/ci'
import { CountInfo } from '../../components/count-info';


export const UserProfile = () => {
    const{ id } = useParams();
    const { isOpen,onOpen,onClose} = useSelector(selectCurrent);
    const userId = Number(id);
    const {data}= useGetUserByIdQuery(userId);
    const[followUser] = useFollowUserMutation();
    const[unfollowUser] = useUnfollowUserMutation();
    const[triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
    const[triggerCurrentQuery]=useLazyCurrentQuery();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrent);


    useEffect(()=>()=>{
        dispatch(resetUser())
    },[])
    const handleFollow= async ()=> {
        try {
            if (id) {
                if(data?.isFollowing)
                    {
                        await unfollowUser({followerId:currentUser.id, followingId:userId}).unwrap()
                    }
                else{ await followUser({followerId:currentUser.id, followingId:userId}).unwrap()}
                triggerGetUserByIdQuery(userId);
            }
            
        } catch (error) {
            
        }
    }

    
    return (
        <>
        <GoBack />
            <div className="flex items-center gap-4">
                <MuiCard className="flex flex-col items-center text-center space-y-4 p-5 flex-2" sx={{ borderRadius: '12px' }}>
                <Box
                    component="img"
                    src={`${data?.avatarUrl}`}
                    alt={data?.username}
                    sx={{
                    width: 200,
                    height: 200,
                    border: '4px solid white',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    }}
                />
                <div className="flex flex-col text-2xl font-bold gap-4 items-center">
                    {data?.username}
                    {currentUser?.id !== id ? (
                    <Button
                        variant="contained"
                        color={data?.isFollowing ? 'inherit' : 'primary'}
                        onClick={handleFollow}
                        endIcon={data?.isFollowing ? <MdOutlinePersonAddDisabled /> : <MdOutlinePersonAddAlt1 />}
                        className="gap-2"
                    >
                        {data?.isFollowing ? 'Отписаться' : 'Подписаться'}
                    </Button>
                    ) : (
                    <Button variant="contained" onClick={onOpen} endIcon={<CiEdit />}>
                        Редактировать
                    </Button>
                    )}
                </div>
                </MuiCard>
                <MuiCard className='flex flex-col space-y-4 p-5 flex-1'>
                    <ProfileInfo title='Почта' info={data?.email}/>
                    <ProfileInfo title='Местоположение' info={data?.location}/>
                    <ProfileInfo title='Дата Рождения' info={formatToClientDate(data?.dataOfBirth)}/>
                    <ProfileInfo title='Обо мне' info={data?.bio}/>
                    <div className="flex gap-2">
                        <CountInfo count={data?.followers.length} title='Подписчики'/>
                        <CountInfo count={data?.followings.length} title='Подписки'/>
                    </div>


                </MuiCard>
             </div>
        
        </>
    )
}