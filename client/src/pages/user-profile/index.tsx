import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { resetUser, selectCurrent } from '../../features/user/userSlice';
import { useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '../../app/services/userApi';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../app/services/followApi';
import { GoBack } from '../../components/go-back';
import { Box, Button, Card as MuiCard, Dialog } from '@mui/material';
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from 'react-icons/md';
import { ProfileInfo } from '../../components/profile-info';
import {formatToClientDate} from '../../utils/format-to-client-date'
import { CiEdit } from 'react-icons/ci'
import { CountInfo } from '../../components/count-info';
import { EditProfile } from '../../components/edit-profile';


export const UserProfile = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
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
            if (id && currentUser?.id) {
                if(data?.isFollowing)
                    {
                        await unfollowUser({followerId:currentUser.id, followingId:userId}).unwrap()
                    }
                else{ await followUser({followerId:currentUser.id, followingId:userId}).unwrap()}
                await triggerGetUserByIdQuery(userId);
                await triggerCurrentQuery();
            }
            
        } catch (error) {
            
        }
    }
    const handleEditProfile = async ()=>{
        
        await triggerGetUserByIdQuery(userId);
        await triggerCurrentQuery();
        setOpen(false);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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
                    border: '1px solid black',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    }}
                />
                <div className="flex flex-col text-2xl font-bold gap-4 items-center">
                    {data?.username}
                    {currentUser?.id !== userId ? (
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
                    <Button 
                        variant="contained" 
                        onClick={handleOpen}
                        endIcon={<CiEdit />}
                        sx={{
                            borderRadius: '8px',
                        }}
                    >
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
                        <CountInfo count={data?.followers.length || 0} title='Подписчики'/>
                        <CountInfo count={data?.followings.length || 0} title='Подписки'/>
                    </div>
                </MuiCard>
             </div>
            <Dialog 
                open={open} 
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <EditProfile isOpen={open} onClose={handleEditProfile} user={data}/>
            </Dialog>
        </>
    )
}