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
            {data  > 0
                ? data.map(post => {
                    const { title, description, createdDate, id, user, likes, comments, likedByUser } = post;
                    return (
                        <Card
                            key={id}
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
                            cardFor="post"
                        />
                    );
                })
                : null}
        </>
    );
};
