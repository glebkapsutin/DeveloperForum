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
                            avatarUrl={avatarUrl || ""}
                            title={title}
                            description={description}
                            name={name || ""}
                            likesCount={likesCount || 0}
                            commentsCount={commentsCount || 0}
                            authorId={authorId || 0}
                            id={id}
                            createdDate={createdDate || new Date().toISOString()}
                            cardFor="post"
                            isLikedByUser={isLikedByUser || false}
                        />
                    )
                )
            ) : (
                <div>No posts available</div>
            )}
        </>
    );
};
