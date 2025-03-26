import React, { useState } from 'react'
import { UserDto } from '../../app/types'
import { useUpdateUserMutation } from '../../app/services/userApi'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Avatar } from '@mui/material'
import { Input } from '../input'
import { MdOutlineEmail, MdOutlineAddAPhoto } from 'react-icons/md'
import { ErrorMessage } from '../error-message'
import { hasErrorField } from '../../utils/has-error-field'
import { Box } from '@mui/material'

interface Props {
  isOpen: boolean
  onClose: () => void
  user?: UserDto
}

interface FormData {
  email: string
  username: string
  dataOfBirth: string
  bio: string
  location: string
}

export const EditProfile: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const { id } = useParams<{ id: string }>()
  const [updateUser] = useUpdateUserMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatarUrl || null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: user?.email || '',
      username: user?.username || '',
      dataOfBirth: user?.dataOfBirth ? new Date(user.dataOfBirth).toISOString().split('T')[0] : '',
      bio: user?.bio || '',
      location: user?.location || ''
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      
      // Создаем URL для предпросмотра
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError(null)

      const userData: Partial<UserDto> = {
        id: Number(id),
        email: data.email,
        username: data.username,
        bio: data.bio,
        location: data.location,
        dataOfBirth: data.dataOfBirth ? new Date(data.dataOfBirth) : undefined,
        role: user?.role,
        avatarUrl: previewUrl || user?.avatarUrl // Используем новый URL предпросмотра или существующий аватар
      }

      if (id) {
        await updateUser({ id: Number(id), userData }).unwrap()
        onClose()
      }
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать профиль</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={previewUrl || user?.avatarUrl}
                sx={{ width: 100, height: 100 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<MdOutlineAddAPhoto />}
                    sx={{
                      borderRadius: '8px',
                    }}
                  >
                    Загрузить аватар
                  </Button>
                </label>
                {selectedFile && (
                  <Typography variant="body2" color="text.secondary">
                    {selectedFile.name}
                  </Typography>
                )}
              </Box>
            </Box>
            <TextField
              label="Email"
              {...register('email', { 
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="Имя пользователя"
              {...register('username', { required: 'Имя пользователя обязательно' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="Дата рождения"
              type="date"
              {...register('dataOfBirth')}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="Обо мне"
              multiline
              rows={4}
              {...register('bio')}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="Местоположение"
              {...register('location')}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose} sx={{
            borderRadius: '8px', color: 'red'
          }}>Закрыть</Button>
          <Button 
            type="submit"
            variant="contained" 
            disabled={loading}
            sx={{
              borderRadius: '8px',
            }}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}