import React, { useState } from 'react';
import { useLikePostMutation, useUnlikePostMutation } from '../../app/services/likesApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { useDeleteCommentMutation } from '../../app/services/commentApi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCurrent } from '../../features/user/userSlice';
import { CardHeader, CardContent, CardActions, Box, CircularProgress } from '@mui/material';
import { Card as MuiCard } from '@mui/material';
import { User } from '../user';
import { ErrorMessage } from '../error-message';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { hasErrorField } from '../../utils/has-error-field';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Typography } from '../typography';
import { MetaInfo } from '../meta-info';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';

type Props = {
    avatarUrl: string;
    name: string;
    authorId: number;
    title: string;
    description: string;
    likesCount: number;
    commentsCount: number;
    createdDate: string;
    id: number;
    cardFor: 'comment' | 'post' | 'current-post';
    isLikedByUser?: boolean;
};

export const Card: React.FC<Props> = ({
    avatarUrl,
    name,
    authorId,
    title,
    description,
    likesCount,
    commentsCount,
    createdDate,
    id,
    cardFor,
    isLikedByUser = false,
}) => {
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrent);

    const refetchPosts = async () => {
        if (cardFor === 'post' || cardFor === 'current-post') {
            await triggerGetAllPosts().unwrap();
        } else if (cardFor === 'comment') {
            await triggerGetPostById(id).unwrap();
        }
    };

    const handleClick = async () => {
        try {
            if (isLikedByUser && currentUser?.id) {
                await unlikePost({ postId: id, userId: currentUser.id }).unwrap();
            } else if (currentUser?.id) {
                await likePost({ postId: id, userId: currentUser.id }).unwrap();
            }
            if (cardFor === 'current-post') {
                await triggerGetPostById(id).unwrap();
            } else if (cardFor === 'post') {
                await triggerGetAllPosts().unwrap();
            }
        } catch (err) {
            setError(hasErrorField(err) ? err.data.error : String(err));
        }
    };

    const handleDelete = async () => {
        try {
            if (cardFor === 'post' || cardFor === 'current-post') {
                await deletePost(id).unwrap();
                await refetchPosts();
                if (cardFor === 'current-post') navigate('/');
            } else if (cardFor === 'comment') {
                await deleteComment(id).unwrap();
                await refetchPosts();
            }
        } catch (err) {
            setError(hasErrorField(err) ? err.data.error : String(err));
        }
    };

    return (
        <MuiCard className="mb-5" sx={{ borderRadius: '12px' }}>
            <div className="flex justify-between items-center">
                <Link to={`/User/${authorId}`}>
                    <User
                        name={name}
                        className="text-sm font-semibold leading-none text-default-600"
                        avatarUrl={avatarUrl}
                        description={formatToClientDate(new Date(createdDate))}
                    />
                </Link>
                {authorId === currentUser?.id && (
                    <div onClick={handleDelete} className="cursor-pointer">
                        {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                        ) : (
                            <RiDeleteBinLine />
                        )}
                    </div>
                )}
            </div>
            <CardContent className="px-3 py-2 mb-5">
                {/* Заголовок */}
                <h2 className="text-2xl font-semibold text-primary">
                    {title}
                </h2>

                {/* Описание */}
                <p className="text-base text-primary mt-2">
                    {description}
                </p>
            </CardContent>

            {cardFor !== 'comment' && (
                <CardActions className="gap-3">
                    <Box className="flex gap-5 items-center">
                        <Box onClick={handleClick} className="cursor-pointer">
                            <MetaInfo count={likesCount} Icon={isLikedByUser ? FcDislike : MdOutlineFavoriteBorder} />
                        </Box>
                        <Link to={`/Post/${id}`}>
                            <MetaInfo count={commentsCount} Icon={FaRegComment} />
                        </Link>
                    </Box>
                    <ErrorMessage error={error} />
                </CardActions>
            )}
        </MuiCard>
    );
};
