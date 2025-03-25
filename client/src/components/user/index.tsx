import React from 'react'
import { useTheme } from '@mui/material/styles'

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
}

export const User: React.FC<Props> = ({
  name,
  avatarUrl,
  description,
  className = ''
}) => {
  const theme = useTheme();
  
  return (
    <div className={`flex items-center gap-3 p-2 ${className}`}>
        <img 
          src={avatarUrl || ''} 
          alt={name || ''} 
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://cdn-icons-png.flaticon.com/512/456/456212.png';
          }}
        />
        <div>
          <p className="text-base font-semibold" style={{ color: theme.palette.text.primary }}>{name || ''}</p>
          {description && (
            <p className="text-sm" style={{ color: theme.palette.text.secondary }}>
              {description}
            </p>
          )}
        </div>
    </div>
  );
};