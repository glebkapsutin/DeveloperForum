import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import { Card } from '../../components/card';
import { CreateComment } from '../../components/create-comment';
import { Post, CommentDto } from '../../app/types';
import { GoBack } from '../../components/go-back';

export const CurrentPost = () => {
    const params = useParams<{ id: string }>();
    const { data: post } = useGetPostByIdQuery(Number(params?.id) ?? 0);

    if (!post) {
        return <h2>Пост не найден</h2>;
    }

    const {
        title,
        description,
        createdDate,
        id,
        authorId,
        avatarUrl,
        name,
        likesCount,
        commentsCount,
        comments = [], // Устанавливаем значение по умолчанию пустой массив
        isLikedByUser
    } = post as Post;

    const hasComments = Array.isArray(comments) && comments.length > 0;

    console.log('Comments:', comments);
    console.log('First comment user:', comments[0]?.user);

    return (
        <> 
             <GoBack />
            <Card
                cardFor="current-post"
                avatarUrl={avatarUrl}
                title={title}
                description={description}
                name={name}
                likesCount={likesCount}
                commentsCount={commentsCount}
                authorId={authorId}
                id={id}
                createdDate={createdDate}
                isLikedByUser={isLikedByUser}
            />
            <div className="mt-10">
                <CreateComment postId={id} />
            </div>
            <div className="mt-10">
                {hasComments ? (
                    comments.map((comment: CommentDto) => (
                        <Card
                            cardFor="comment"
                            key={comment.id}
                            avatarUrl={comment.user?.avatarUrl || ""}
                            title=""
                            description={comment.description}
                            authorId={comment.userId}
                            id={comment.id}
                            name={comment.user?.username || "Пользователь"}
                            likesCount={0}
                            commentsCount={0}
                            createdDate={comment.createdDate}
                            isLikedByUser={false}
                            postId={id}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Комментариев пока нет</p>
                )}
            </div>
        </>
    );
};
