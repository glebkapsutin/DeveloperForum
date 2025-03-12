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

    const { title, description, createdDate, id, author, avatarUrl, likesCount, commentsCount, comments } = data;

    return (
        <>
            <Card
                cardFor="current-post"
                avatarUrl={avatarUrl ?? ""}
                title={title}
                description={description}
                name={author ?? ""}
                likes={likesCount}
                comments={commentsCount}
                authorId={id.toString()}
                id={id}
                createdDate={createdDate}
            />
            <div className="mt-10">
                <CreateComment />
            </div>
            <div className="mt-10">
                {comments && comments.length > 0
                    ? comments.map((comment: any) => (
                        <Card
                            cardFor="comment"
                            key={comment.id}
                            avatarUrl={comment.avatarUrl ?? ""}
                            title={comment.author ?? ""}
                            description={comment.description}
                            authorId={comment.userId.toString()}
                            id={comment.id}
                        />
                    ))
                    : <p>Комментариев пока нет</p>}
            </div>
        </>
    );
};
