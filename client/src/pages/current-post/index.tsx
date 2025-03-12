import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import { Card } from '../../components/card';
import { CreateComment } from '../../components/create-comment';

export const CurrentPost = () => {
    const params = useParams<{ id: string }>();
    const { data } = useGetPostByIdQuery(params?.id ?? "");

    if (!data) {
        return <h2>Поста не существует</h2>;
    }

    const { title, description, createdDate, id, user, likes, comments, likedByUser } = data;

    return (
        <>
            <Card
                cardFor="current-post"
                avatarUrl={user?.avatarUrl ?? ""}
                title={title}
                description={description}
                name={user?.userName ?? ""}
                likesCount={likes?.$values?.length || 0}
                commentsCount={comments?.$values?.length || 0}
                authorId={user?.id ? user.id.toString() : ""}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdDate}
            />
            <div className="mt-10">
                <CreateComment />
            </div>
            <div className="mt-10">
                {comments && comments.$values && comments.$values.length > 0
                    ? comments.$values.map((comment: any) => (
                        <Card
                            cardFor="comment"
                            key={comment.id}
                            avatarUrl={comment.user?.avatarUrl ?? ""}
                            content={comment.content}
                            name={comment.user?.userName ?? ""}
                            authorId={comment.userId.toString()}
                            commentId={comment.id}
                            id={id}
                        />
                    ))
                    : null}
            </div>
        </>
    );
};
