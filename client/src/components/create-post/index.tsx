import React from 'react';
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../app/services/postApi';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { IoMdCreate } from 'react-icons/io';  

import { ErrorMessage } from '../error-message';

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue('post', '');
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmit}>
      <Controller
        name='post'
        control={control}
        defaultValue=''
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <TextField
            {...field}
            label='О чем думаете?'
            variant='outlined'
            fullWidth
            error={!!errors.post}
            helperText={errors.post ? errors.post.message : ''}
            className='mb-2'
          />
        )}
      />

      {errors && <ErrorMessage error={error} />}

      <Button
        type='submit'
        variant='contained'
        color='success'
        endIcon={<IoMdCreate />}
        className='self-end'
      >
        Добавить пост
      </Button>
    </form>
  );
};
