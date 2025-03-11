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
      await createPost({ 
        title: data.title,
        description: data.description,
        

                          
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
            helperText={errors.title ? errors.title.message : ''}
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
            helperText={errors.description ? errors.description.message : ''}
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
