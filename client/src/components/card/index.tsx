import React, { useState } from 'react'
import{useLikePostMutation,useUnlikePostMutation} from '../../app/services/likesApi'
import { getPostById, useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { useDeleteCommentMutation } from '../../app/services/commentApi';  
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCurrent } from '../../features/user/userSlice';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import { User } from '../user';
import {formatToClientDate} from '../../utils/format-to-client-date'
import { hasErrorField } from '../../utils/has-error-field';
import { RiDeleteBinLine } from 'react-icons/ri';

type Props = {
    avatarUrl: string;
    name: string;
    authorId: string;
    title: string;
    description: string;
    commentId?: 0;
    likesCount?: number;
    commentsCount?: number;
    createdAt?: Date;
    id?: number;
    cardFor: 'comment' | "post" | 'current-post'
    likedByUser?: boolean;
}
export const Card: React.FC<Props> = ({
    avatarUrl = '',
    name = '',
    authorId = '',
    description = '',
    title= '',
    commentId = 0,
    likesCount = 0,
    commentsCount = 0,
    createdAt,
    id = 0,
    cardFor = "post",
    likedByUser = false,
  }) => {
    const[likePost] = useLikePostMutation();
    const[unlikePost] = useUnlikePostMutation();
    const[triggerGetAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const[deletePost,deletePostStatus] = useDeletePostMutation();
    const[deleteComment,deleteCommentStatus] = useDeleteCommentMutation();
    const [error,setError] =useState('');
    const navigate = useNavigate();
    const currentUser= useSelector(selectCurrent);
    const refetchPosts = async() =>{
        switch(cardFor) {
            case 'post':
            case 'current-post':
                await triggerGetAllPosts().unwrap();

                break;
            case 'comment':
                await triggerGetPostById(id).unwrap();
                break;
            default:
                throw new Error('неверный аргумент cardFor');
        }
    }
   
    const handleClick = async () => {
        try {
        // Если пользователь уже поставил лайк (likedByUser true),
        // вызываем функцию для снятия лайка.
        if (likedByUser) {
            await unlikePost(id).unwrap();
        } else {
            // Иначе вызываем функцию для установки лайка, передавая ID поста.
            await likePost({ postId: id }).unwrap();
        }
        
        // После изменения лайка обновляем данные:
        // Если карточка детального поста, запрашиваем данные конкретного поста.
        if (cardFor === 'current-post') {
            await triggerGetPostById(id).unwrap();
        }
        // Если карточка обычного поста, запрашиваем весь список постов.
        if (cardFor === 'post') {
            await triggerGetAllPosts().unwrap();
        }
        } catch (err) {
        // Если произошла ошибка, проверяем её структуру с помощью hasErrorField.
        if (hasErrorField(err)) {
            setError(err.data.error); // Если ошибка соответствует ожидаемой структуре, берём текст ошибки.
        } else {
            setError(err as string); // Иначе приводим ошибку к строке.
        }
        }
    };
    const handleDelete = async ()=> {
        try{
            switch(cardFor) {
                case 'post':
                    await deletePost(id).unwrap();
                    await refetchPosts();
                    break;
                case 'current-post':
                    await deletePost(id).unwrap();
                    await refetchPosts();
                    break;
                case 'comment':
                    await deleteComment(commentId).unwrap();
                    await refetchPosts();
                    break;
                default:
                    throw new Error('Неверный аргумент cardFor');
            }
        }
        catch(err){
            if (hasErrorField(err)) {
                setError(err.data.error);
              } else {
                setError(err as string);
            }
          
        }
    };
  
    return (
        <Card className='mb-5'>
            <CardContent className='justify-between items-center bg-transpare'>
                <Link to={`/User/${authorId}`}>
                    <User
                        name={name}
                        className='text-small font-semibold leading-non text-default-600'
                        avatarUrl={avatarUrl}
                        description={createdAt && formatToClientDate(createdAt)}
                    />

                </Link>
                {
                    authorId ===currentUser.id && (
                        <Box onClick={handleDelete} className="cursor-pointer">
                            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ?(
                                <CircularProgress size={20}/>
                            ) : (
                                <RiDeleteBinLine/>
                            )}

                        </Box>
                    )
                    

                }
                
            </CardContent>
        </Card>
    
    )
}