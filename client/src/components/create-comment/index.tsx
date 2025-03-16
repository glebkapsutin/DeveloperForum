import React from 'react';
import { useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { IoMdCreate } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../../app/services/commentApi';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';

type Props = {
    postId?: number;
};

export const CreateComment: React.FC<Props> = ({ postId }) => {
    const { id } = useParams();
    const [createComment] = useCreateCommentMutation();
    const [getPostById] = useLazyGetPostByIdQuery();
    const currentUser = useSelector(selectCurrent);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const targetPostId = postId || (id ? parseInt(id) : null);
            if (targetPostId && currentUser) {
                const commentData = {
                    description: data.comment,
                    userId: currentUser.id,
                    postId: targetPostId,
                    createdDate: new Date().toISOString()
                };
                console.log('Comment Data:', commentData);
                await createComment(commentData).unwrap();
                setValue('comment', '');
                await getPostById(targetPostId).unwrap();
            }
        } catch (error) {
            console.log('Error creating comment:', error);
        }
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mb-4">
            <Controller
                name="comment"
                control={control}
                defaultValue=""
                rules={{ required: 'Комментарий обязателен' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Добавить комментарий"
                        multiline
                        rows={4}
                        error={!!errors.comment}
                        helperText={errors.comment?.message?.toString()}
                    />
                )}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<IoMdCreate />}
                className="mt-4"
            >
                Ответить
            </Button>
        </form>
    );
};