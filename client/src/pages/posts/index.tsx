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
            {data && data.length > 0 ? (
                data.map(
                    ({
                        title,
                        description,
                        authorId,
                        avatarUrl,
                        name,
                        id,
                        likesCount,
                        commentsCount,
                        createdDate,
                        isLikedByUser
                    }) => (
                        <Card
                            key={id}
                            avatarUrl={avatarUrl}
                            title={title}
                            description={description}
                            name={name}
                            likesCount={likesCount}
                            commentsCount={commentsCount}
                            authorId={authorId}
                            id={id}
                            createdDate={createdDate}
                            cardFor="post"
                            isLikedByUser={isLikedByUser}
                        />
                    )
                )
            ) : (
                <div>No posts available</div>
            )}
        </>
    );
};
