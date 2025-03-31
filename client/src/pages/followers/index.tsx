import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { Link } from 'react-router-dom'
import { Card, CardMedia } from '@mui/material';
import { User } from "../../components/user"
import { useLazyGetUserByIdQuery } from '../../app/services/userApi';

export const Followers = () => {
    const currentUser = useSelector(selectCurrent)
    const [getUserById] = useLazyGetUserByIdQuery()

    useEffect(() => {
        if (currentUser?.id) {
            getUserById(currentUser.id)
        }
    }, [currentUser?.id, getUserById])

    if (!currentUser) {
        return null
    }

    return currentUser.followers.length > 0 ? (
        <div className="gap-5 flex flex-col">
            {
                currentUser.followers.map(follow => (
                    <Link to={`/User/${follow.follower.id}`} key={follow.follower.id} style={{ textDecoration: 'none' }}>
                        <Card sx={{ borderRadius: '12px' }}>
                            <CardMedia className='block'>
                                <User
                                    name={follow.follower.userName}
                                    avatarUrl={follow.follower.avatarUrl}
                                    description={follow.follower.email}
                                />
                            </CardMedia>
                        </Card>
                    </Link>
                ))
            }
        </div>
    ) : (
        <h1>У вас нет подписчиков</h1>
    )
}