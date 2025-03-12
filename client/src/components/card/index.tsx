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
    authorId: string;
    title: string;
    description: string;
    likes: any;
    comments: any;
    createdDate: string;
    id: number;
    cardFor: 'comment' | 'post' | 'current-post';
    likedByUser?: boolean;
};

export const Card: React.FC<Props> = ({
    avatarUrl,
    name,
    authorId,
    title,
    description,
    likes,
    comments,
    createdDate,
    id,
    cardFor,
    likedByUser = false,
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
        switch (cardFor) {
            case 'post':
            case 'current-post':
                await triggerGetAllPosts().unwrap();
                break;
            case 'comment':
                await triggerGetPostById(id).unwrap();
                break;
            default:
                throw new Error('Неверный аргумент cardFor');
        }
    };

    const handleClick = async () => {
        try {
            if (likedByUser) {
                await unlikePost(id).unwrap();
            } else {
                await likePost({ postId: id }).unwrap();
            }
            if (cardFor === 'current-post') {
                await triggerGetPostById(id).unwrap();
            }
            if (cardFor === 'post') {
                await triggerGetAllPosts().unwrap();
            }
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            } else {
                setError(err as string);
            }
        }
    };

    const handleDelete = async () => {
        try {
            switch (cardFor) {
                case 'post':
                case 'current-post':
                    await deletePost(id).unwrap();
                    await refetchPosts();
                    if (cardFor === 'current-post') navigate('/');
                    break;
                case 'comment':
                    await deleteComment(id).unwrap();
                    await refetchPosts();
                    break;
                default:
                    throw new Error('Неверный аргумент cardFor');
            }
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            } else {
                setError(err as string);
            }
        }
    };

    return (
        <MuiCard className="mb-5">
            <CardHeader className="flex justify-between items-center bg-transparent">
                <Link to={`/users/${authorId}`}>
                    <User
                        name={name}
                        className="text-sm font-semibold leading-none text-default-600"
                        avatarUrl={avatarUrl}
                        description={formatToClientDate(createdDate)}
                    />
                </Link>
                {authorId === currentUser?.id && (
                    <Box onClick={handleDelete} className="cursor-pointer">
                        {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <RiDeleteBinLine />
                        )}
                    </Box>
                )}
            </CardHeader>
            <CardContent className="px-3 py-2 mb-5">
                <Typography variant="body1">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
            {cardFor !== 'comment' && (
                <CardActions className="gap-3">
                    <Box className="flex gap-5 items-center">
                        <Box onClick={handleClick} className="cursor-pointer">
                            <MetaInfo
                                count={likes?.$values?.length || 0}
                                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
                            />
                        </Box>
                        <Link to={`/posts/${id}`}>
                            <MetaInfo count={comments?.$values?.length || 0} Icon={FaRegComment} />
                        </Link>
                    </Box>
                    <ErrorMessage error={error} />
                </CardActions>
            )}
        </MuiCard>
    );
};
