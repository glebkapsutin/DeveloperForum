import React from 'react';
import { useGetAllPostsQuery } from '../../app/services/postApi';
import { CreatePost } from '../../components/create-post';
import { Card } from '../../components/card/index';

export const Posts = () => {
    const { data } = useGetAllPostsQuery();

    return (
        <>
            <div className="mb-10 w-full">
                <CreatePost />
            </div>
            {data?.length > 0
                ? data.map(post => {
                    const { title, description, createdDate, id, author, avatarUrl, likesCount, commentsCount } = post;
                    return (
                        <Card
                            key={id}
                            avatarUrl={avatarUrl ?? ""}
                            title={title}
                            description={description}
                            name={author ?? ""}
                            likes={likesCount}
                            comments={commentsCount}
                            authorId={id.toString()}
                            id={id}
                            createdDate={createdDate}
                            cardFor="post"
                        />
                    );
                })
                : <p>Постов пока нет</p>}
        </>
    );
};
