import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { MdAlternateEmail } from 'react-icons/md';
import { useTheme } from "@mui/material/styles";
export const Profile = () => {
  const current = useSelector(selectCurrent);
  const theme = useTheme();
  if (!current) return null;
  const { username, email, avatarUrl, id } = current;

  return (
     <Card className="py-4" sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        image={`${avatarUrl}`}
        alt="Avatar"
        sx={{ width: '100%', height: 'auto' }}
        className="object-cover rounded-xl"
      />
      <CardContent>
        <Link to={`/User/${id}`} style={{ textDecoration: 'none' }} >
          <Typography variant="h6" className="font-bold text-large mb-2" sx={{ color: theme.palette.text.primary, fontWeight: "bold", "&:hover": { color: "gray" } }}>
            {username}
          </Typography>
        </Link>
        <Typography variant="body2" className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
};
