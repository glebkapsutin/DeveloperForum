import React from 'react';
import { useCreatePostMutation, useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { IoMdCreate } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../../app/services/commentApi';

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue('comment', '');
        await getPostById(id).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: 'Обязательное поле'
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Напишите свой комментарий"
            variant="outlined"
            fullWidth
            error={!!errors.comment}
            helperText={errors.comment?.message}
            className="mb-5"
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        endIcon={<IoMdCreate />}
        type="submit"
        className="mt-4"
      >
        Ответить
      </Button>
    </form>
  );
};