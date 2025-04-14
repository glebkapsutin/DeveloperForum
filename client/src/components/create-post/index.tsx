import React from 'react';
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../app/services/postApi';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { IoMdCreate } from 'react-icons/io';  
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { ErrorMessage } from '../error-message';

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();
  const currentUser = useSelector(selectCurrent);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentUser?.id) {
        throw new Error('Пользователь не авторизован');
      }

      await createPost({ 
        title: data.title,
        description: data.description,
        userId: currentUser.id,
        authorId: currentUser.id,
        avatarUrl: currentUser.avatarUrl,
        name: currentUser.username,
        likesCount: 0,
        commentsCount: 0,
        isLikedByUser: false
      }).unwrap();
      setValue('title', '');
      setValue('description', '');
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmit} >
      <Controller 
        name='title'
        control={control}
        defaultValue=''
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Заголовок'
            variant='outlined'
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message?.toString() || ''}
            className='mb-2'
            InputProps={{
              sx: { borderRadius: '12px' }
            }}
          />
        )}
      />
      <Controller
        name='description'
        control={control}
        defaultValue=''
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Опиcание'
            variant='outlined'
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message?.toString() || ''}
            className='mb-2'
            multiline
            rows={4}
            InputProps={{
              sx: { borderRadius: '12px' }
            }}
          />
        )}
      />

      {errors && <ErrorMessage error={error} />}

      <Button
        type='submit'
        variant='contained'
        color='success'
        endIcon={<IoMdCreate />}
        className='self-start'
        sx={{ borderRadius: '12px' }}
      >
        Добавить пост
      </Button>
    </form>
  );
};
