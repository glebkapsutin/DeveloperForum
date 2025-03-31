import { Card, CardMedia } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../components/user'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { useLazyGetUserByIdQuery } from '../../app/services/userApi'
export const Following = () => {
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
    return currentUser.followings.length > 0 ? (
        <div className="gap-5 flex flex-col">
          {
            currentUser.followings.map(follow => (
             <Link to ={`/User/${follow.following.id}`} key={follow.following.id} style={{ textDecoration: 'none' }}>
                <Card sx={{ borderRadius: '12px' }}>
                    <CardMedia className='block'>
                      <User
                        name={follow.following.userName}
                        avatarUrl={follow.following.avatarUrl}
                        description={follow.following.email}
                      />
                    </CardMedia>
                </Card>
             </Link>
            ))
          }
        </div>
      ) : (
        <h1>У вас нет подписок</h1>
      )
}