import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import { Card } from '../../components/card';
import { CreateComment } from '../../components/create-comment';

export const CurrentPost = () => {
    const params = useParams<{ id: string }>();
    const { data } = useGetPostByIdQuery(Number(params?.id) ?? 0);

    if (!data) {
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
        comments,
        isLikedByUser
    } = data;

    return (
        <>
            <Card
                cardFor="current-post"
                avatarUrl={avatarUrl || ""}
                title={title}
                description={description}
                name={name || ""}
                likesCount={likesCount || 0}
                commentsCount={commentsCount || 0}
                authorId={authorId || 0}
                id={id}
                createdDate={createdDate || new Date().toISOString()}
                isLikedByUser={isLikedByUser || false}
            />
            <div className="mt-10">
                <CreateComment />
            </div>
            <div className="mt-10">
                {comments && comments.length > 0 ? (
                    comments.map((comment: any) => (
                        <Card
                            cardFor="comment"
                            key={comment.id}
                            avatarUrl={comment.avatarUrl || ""}
                            title={comment.author || ""}
                            description={comment.description}
                            authorId={Number(comment.userId)}
                            id={comment.id}
                            name={comment.author || ""}
                            likesCount={0}
                            commentsCount={0}
                            createdDate={comment.createdDate || new Date().toISOString()}
                            isLikedByUser={false}
                        />
                    ))
                ) : (
                    <p>Комментариев пока нет</p>
                )}
            </div>
        </>
    );
};
