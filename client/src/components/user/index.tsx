import React from 'react'

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
  return (
    <div className={`flex items-center gap-3 ${className}`}>
        <img 
          src={avatarUrl || ''} 
          alt={name || ''} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-semibold">{name || ''}</p>
          {description && (
            <p className="text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
    </div>
  );
};