import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'


type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
}

export const User: React.FC<Props> = ({
  name = '',
  avatarUrl = '',
  description = '',
  className = ''
}) => {
  return (
    <Box className={`flex items-center gap-3 ${className}`}>
        <Avatar src={`${avatarUrl}`} alt={name} />
        <Box>
        <Typography variant="subtitle1">{name}</Typography>
        {description && (
            <Typography variant="body2" color="text.secondary">
            {description}
            </Typography>
        )}
        </Box>
  </Box>
  );
};