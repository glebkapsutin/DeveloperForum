import React, { useState, ReactNode, useEffect } from 'react';
import { useLikePostMutation, useUnlikePostMutation } from '../../app/services/likesApi';
import { getPostById, useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi';
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
import { useTheme } from "@mui/material/styles";
import { Comment } from '../../app/types';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

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
    comments?: Comment[];
    postId?: number;
};

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
    const codeRef = React.useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <pre className="rounded-lg overflow-hidden bg-[#1E1E1E] p-4">
            <code ref={codeRef} className={`language-${language}`}>
                {code}
            </code>
        </pre>
    );
};

const renderDescription = (description: string): ReactNode[] => {
    // Регулярное выражение для поиска блоков кода
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(description)) !== null) {
        // Добавляем текст до блока кода
        if (match.index > lastIndex) {
            parts.push(
                <p key={`text-${lastIndex}`} className="text-base text-primary mt-2">
                    {description.slice(lastIndex, match.index)}
                </p>
            );
        }

        // Добавляем блок кода с подсветкой синтаксиса
        const language = match[1] || 'plaintext';
        const code = match[2].trim();
        parts.push(
            <div key={`code-${match.index}`} className="my-4">
                <CodeBlock code={code} language={language} />
            </div>
        );

        lastIndex = match.index + match[0].length;
    }

    // Добавляем оставшийся текст после последнего блока кода
    if (lastIndex < description.length) {
        parts.push(
            <p key={`text-${lastIndex}`} className="text-base text-primary mt-2">
                {description.slice(lastIndex)}
            </p>
        );
    }

    return parts.length > 0 ? parts : [
        <p key="default" className="text-base text-primary mt-2">
            {description}
        </p>
    ];
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
    comments,
    postId,
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
    const theme = useTheme();

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
            } else if (cardFor === 'comment' && postId) {
                await deleteComment(id).unwrap();
                await triggerGetPostById(postId).unwrap();
            }
        } catch (err) {
            setError(hasErrorField(err) ? err.data.error : String(err));
        }
    };

    return (
        <MuiCard className="mb-5 relative"  sx={{ borderRadius: '12px' }}>
            <div className="flex justify-between items-center">
                <Link to={`/User/${authorId}`} className="no-underline text-inherit hover:text-inherit">
                    <User
                        name={name}
                        className="text-sm font-semibold leading-none text-default-600"
                        avatarUrl={avatarUrl}
                        description={formatToClientDate(new Date(createdDate))}
                    />
                </Link>
                {authorId === currentUser?.id && (
                    <div onClick={handleDelete} className="cursor-pointer absolute top-2 right-1">
                        {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                        ) : (
                            <RiDeleteBinLine className="text-red-500" />
                        )}
                    </div>
                )}
            </div>
            <CardContent className="px-3 py-2 mb-5">
               
                <h2 className="text-2xl font-semibold text-primary">
                    {title}
                </h2>

               
                <div className="mt-2">
                    {renderDescription(description)}
                </div>
            </CardContent>

            {cardFor !== 'comment' && (
                <CardActions className="gap-3">
                    <Box className="flex gap-5 items-center">
                        <Box onClick={handleClick} className="cursor-pointer">
                            <MetaInfo count={likesCount} Icon={isLikedByUser ? FcDislike : MdOutlineFavoriteBorder} />
                        </Box>
                        <Box>
                            <Link to={`/Post/${id}`} className="no-underline">
                                <MetaInfo 
                                    count={commentsCount} 
                                    Icon={FaRegComment} 
                                    iconStyle={{ color: theme.palette.text.primary }}
                                />
                            </Link>
                        </Box>
                    </Box>
                    <ErrorMessage error={error} />
                </CardActions>
            )}
        </MuiCard>
    );
};
